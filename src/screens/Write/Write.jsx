import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "./Write.css";
import "react-quill/dist/quill.snow.css";
import Navbar from "../Navbar/Navbar";
import { addBlog } from "../../apis/Blogs";
import { searchAI } from "../../apis/AI";
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
  const [aiResponse, setAiResponse] = useState("");

  const [post, setPost] = useState({
    title: "",
    image: "",
    description: "",
    tag: "",
  });
  const [AI, setAI] = useState({ prompt: "" });

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
    let userToken = JSON.parse(localStorage.getItem("userToken"));
    const res = await addBlog(post, userToken);
    console.log(res);
  };

  const handleAI = async () => {
    const res = await searchAI(AI);
    console.log(res);
    setAiResponse(AI.prompt); // Assuming the response is in res.data
  };

  return (
    <>
      <div className="container mt-5" style={{ display: "flex" }}>
        <form
          style={{ width: "60vw", margin: "25px", border: "1px black solid" }}
        >
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
                style={{ fontSize: "15px" }}
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
        <div
          style={{
            flexDirection: "row",
            width: "35vw",
            paddingTop: "20px",
          }}
        >
          {/* <div style={{ color: "black", fontSize: "30px", fontWeight:"600" }}>Ask AI</div> */}
          <input
            onChange={(e) => setAI({ prompt: e.target.value })}
            className="inputs"
            type="text"
            placeholder="Search"
            value=""
          />
          <button
            onClick={handleAI}
            style={{
              width: "100%",
              height: "40px",
              borderRadius: "10px",
              borderWidth: "2px",
              borderColor: "black",
              fontSize: "20px",
              backgroundColor: "rgba(232, 243, 243, 1)",
            }}
          >
            Ask AI
          </button>
          {aiResponse && (
            <div className="ai-response" style={{ textOverflow: "ellipsis" }}>
              {aiResponse}
            </div>
          )}
        </div>
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