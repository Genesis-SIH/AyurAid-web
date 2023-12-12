import React, { useState } from "react";
import "./Home.css";
import { categoryCount, getAllBlogs, getBlogById } from "../../apis/Blogs";
import { getUserById } from "../../apis/users";
import { useEffect, useContext } from "react";
import { LoginContext } from "../../utils/contextProvider/Context";
import { useNavigate } from "react-router-dom";
import loadingAnimation from "../../assets/loading.gif";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
export const user = [];

function ShortBlogs(props) {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    let userDataString = localStorage.getItem("userCred");
    let userData = JSON.parse(userDataString);
    const res = await getAllBlogs(userData.data.token);
    setBlogs(res.data.data.allBlogs);
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      {blogs
        ? blogs.map((e, index) => {
            return (
              <>
                <a href={`/blog/${e._id}`}>
                  <div className="short-blog">
                    <h3 className="right-blog-title short-blog-title">
                      {e.title}{" "}
                      <a href={`/tag/${e.category}`}>
                        <span className="category">{e.tag}</span>
                      </a>
                    </h3>
                    <div className="minor-info pt-2 mb-0">
                      <img
                        className="author-image"
                        src={`data:image/jpeg;base64,${e.authorImage}`}
                        alt=""
                      />
                      &nbsp;
                      <div className="icons-flex">
                        | &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 small-icons"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                          />
                        </svg>
                        &nbsp;
                        <p className="publishdate">{e.publishDate}</p>
                      </div>
                      &nbsp;
                      <div className="icons-flex">
                        | &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 small-icons"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        &nbsp;
                        <p className="publishdate"> {e.readtime}min </p>
                      </div>
                    </div>
                    <div
                      className="intro right-intro"
                      dangerouslySetInnerHTML={{
                        __html: e.description.slice(0, 130),
                      }}
                    ></div>
                  </div>
                </a>
              </>
            );
          })
        : null}
    </>
  );
}

export function RightSection() {
  return (
    <>
      <div className="sec-2-right">
        <div className="container-fluid homepage">
          <section className="right-section">
            <div className="right-blog">
              <h3 className="featured">
                <span className="backgroundColor">&nbsp;Popular </span>
                &nbsp;Posted
              </h3>
              <div className="scroll">
                <ShortBlogs />
              </div>
            </div>
          </section>
        </div>
        <div
          className="container-fluid homepage"
          style={{ display: "block", marginTop: "50px" }}
        >
          <section className="right-section">
            <div className="right-blog">
              <div className="search-with-tags">
                <h3 className="featured">
                  <span className="backgroundColor">&nbsp;Popular&nbsp;</span>
                  &nbsp;categories
                </h3>
                <div
                  className="all-tags  mt-4"
                  style={{ paddingRight: "80px" }}
                >
                  <a href={`/tag/Travel`}>
                    <button className="tag">Travel</button>
                  </a>
                  <a href={`/tag/Lifestyle`}>
                    <button className="tag">Lifestyle</button>
                  </a>
                  <a href={`/tag/Fashion`}>
                    <button className="tag">Fashion</button>
                  </a>
                  <a href={`/tag/Technology`}>
                    <button className="tag">Technology</button>
                  </a>
                  <a href={`/tag/Business`}>
                    <button className="tag">Business</button>
                  </a>
                  <a href={`/tag/Health`}>
                    <button className="tag">Health</button>
                  </a>
                  <a href={`/tag/Javascript`}>
                    <button className="tag">Javascript</button>
                  </a>
                  <a href={`/tag/Blockchain`}>
                    <button className="tag">Blockchain</button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
function Home() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext);
  const pageRoute = useNavigate();

  const getBlogs = async () => {
    let userDataString = localStorage.getItem("userCred");
    let userData = JSON.parse(userDataString);
    setLoginData(userData.data);
    let res = await getAllBlogs(userData.data.token);
    setAllBlogs(res.data.data.allBlogs);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <section style={{ display: loading ? "none" : "" }} className="section-2">
        <div className="sec-2-left">
          <h3 className="featured">
            <span className="backgroundColor">&nbsp;Recently </span>&nbsp;Posted
          </h3>
          <div className="recent-blogs">
            {allBlogs.map((e, index) => {
              return (
                <a href={`/blog/${e._id}`}>
                  <div key={e._id} className="blog-card">
                    <img
                      onClick={() => pageRoute(`/${e._id}`)}
                      className="recent-blog-img"
                      src={`data:image/jpeg;base64,${e.image}`}
                      alt=""
                    />
                    <div className="blogInfo">
                      <a href={`/tag/${e.category}`}>
                        <span className="category">{e.tag}</span>
                      </a>
                      <h3 className="right-blog-title mt-2">{e.title}</h3>
                      <a
                        style={{ textDecoration: "none" }}
                        href={`/profile/${e.authorid}`}
                      >
                        <div className="minor-info">
                          <img
                            className="author-image"
                            src={`data:image/jpeg;base64,${e.authorImage}`}
                            alt=""
                          />
                          <span className="publishuser">
                            &nbsp;&nbsp;{e.authorName}
                          </span>
                          &nbsp;
                          <div className="icons-flex">
                            &nbsp;
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 small-icons"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                              />
                            </svg>
                            &nbsp;
                            <p className="publishdate">{e.publishDate}</p>
                          </div>
                          &nbsp;
                          <div className="icons-flex">
                            {" "}
                            &nbsp;
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 small-icons"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            &nbsp;
                            <p className="publishdate">{e.readtime}min</p>
                          </div>
                        </div>
                      </a>
                      <div
                        className="intro right-intro recent-blogs-intro"
                        dangerouslySetInnerHTML={{
                          __html: e.description.slice(0, 150) + "...",
                        }}
                      ></div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <RightSection />
      </section>
      <div style={{ display: loading ? "none" : "" }}></div>
    </>
  );
}

export default Home;