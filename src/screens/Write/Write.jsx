import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "./Write.css";
import "react-quill/dist/quill.snow.css";
import Navbar from "../Navbar/Navbar";
import { addBlog } from "../../apis/Blogs";
import { useContext } from "react";
import { useRef } from "react";
import { postBlog } from "../../apis/Blogs";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LoginContext } from "../../utils/contextProvider/Context";

function Write() {
  const { loginData, setLoginData } = useContext(LoginContext);

  const [post, setPost] = useState({
    title: "",
    image: "",
    description: "",
    tag: "",
  });

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const imageIn = base64.split(",")[1];
    setPost({ ...post, image: imageIn });
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    let userDataString = localStorage.getItem("userCred");
    let userData = JSON.parse(userDataString);
    console.log(post);
    const res = await addBlog(post, userData.data.token);
    console.log(res);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container mt-5">
        <form>
          <input
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="inputs"
            type="text"
            name="title"
            placeholder="Title"
            required
          />
          <button class="thumbnailbtn" type="button">
            <div className="thumbnaildiv">
              <input
                type="file"
                id="imageInput"
                onChange={(e) => {
                  handleImageUpload(e);
                }}
              />
            </div>
          </button>
          <ReactQuill
            id="editor"
            modules={Write.modules}
            theme="snow"
            required
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e })}
            placeholder="Start Writing From here"
            style={{ marginTop: "-14px", color: "black" }}
          />
          <div className="write-flex">
            <div>
              <input
                onChange={(e) => setPost({ ...post, tag: e.target.value })}
                className="categoryInput"
                type="text"
                name="category"
                placeholder="Enter category"
                required
              />
              <small class="form-text text-muted thumbnailMessage mb-3">
                Eg: Technology
              </small>
            </div>
          </div>
          <button
            className="publish-btn mt-3"
            onClick={(e) => handlePublish(e)}
          >
            Publish
          </button>
        </form>
      </div>
    </>
  );
}
Write.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["clean"],
  ],
};
export default Write;
