import React, { useState } from "react";
import "./Blog.css";
import { BsLink45Deg } from "react-icons/bs";
import { AiOutlineShareAlt, AiOutlineLike, AiFillLike } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { MdOutlineBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getAllBlogs, getBlogById } from "../../apis/Blogs.js";
import { useEffect } from "react";
import { LoginContext } from "../../utils/contextProvider/Context";
import { useContext } from "react";
import Share from "../AdditionalPages/Share";
import Lottie from "react-lottie";
import animationData from "../../assets/leafLoading.json";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const { langGlobal, setLangGlobal } = useContext(LoginContext);
  const { loading, setLoading } = useContext(LoginContext);
  const id = useParams();
  const [blog, setBlog] = useState([]);
  const [showApp, setShowApp] = useState(false);

  const getBlogs = async () => {
    setLoading(true);
    let userToken = localStorage.getItem("userToken");
    if (userToken) {
      let res = await getAllBlogs(JSON.parse(userToken), langGlobal);
      const resAll = await getBlogById(JSON.parse(userToken), id, langGlobal);
      setBlog(resAll.data.data.blog);
      setBlogs(res.data.data.allBlogs);
    }
    setLoading(false);
  };
  useEffect(() => {
    getBlogs();
  }, [langGlobal]);

  const shareToApps = () => {
    if (showApp === false) {
      setShowApp(true);
    } else {
      setShowApp(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {loading ? (
        <Lottie
          options={defaultOptions}
          height={150}
          width={150}
          style={{ marginTop: "25vh" }}
        />
      ) : (
        <div
          style={{ display: loading ? "none" : "" }}
          className="blog-container"
        >
          <section className="blog-section">
            {
              <>
                <span className="category" style={{ color: "black" }}>
                  {blog.tag}
                </span>
                <div className="topBlogFlex">
                  <div className="minor-info single-info">
                    <a href={`/profile/${blog.authorid}`}>
                      <img
                        className="author-image single-blog-author"
                        src={blog.authorImage}
                        alt=""
                        style={{ height: "50px", width: "auto" }}
                      />
                    </a>
                    <div className="authorProfileInfo">
                      <a href={`/profile/${blog.authorid}`}>
                        <p className="profile-author-name pl-1">
                          {blog.authorName}
                        </p>
                      </a>

                      <div className="profileMinorInfo">
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
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>
                          &nbsp;
                          <p className="publishdate">
                            &nbsp;{blog.publishDate}&nbsp;
                          </p>
                        </div>

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
                          <p className="publishdate">
                            &nbsp;{blog.readtime}min&nbsp;
                          </p>
                        </div>

                        <div className="link-div">
                          <MdOutlineBookmarkAdd
                            style={{
                              display: "none",
                              color: "black",
                            }}
                            className="bookmark-icon blog-icons"
                          />
                          <MdOutlineBookmark
                            style={{
                              display: "block",
                              color: "black",
                            }}
                            className="bookmark-icon blog-icons"
                          />
                          <BsLink45Deg
                            className="link-icon blog-icons"
                            style={{ color: "black" }}
                          />
                          <span style={{ display: "block" }} className="copied">
                            Copied
                          </span>
                        </div>
                      </div>
                    </div>
                    &nbsp;
                  </div>
                </div>
                <div className="single-blog-container">
                  <h3 className="single-blog-title">{blog.title}</h3>
                  <img className="single-blog-image" src={blog.image} alt="" />
                  <div
                    className="description-area"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  ></div>
                  <div className="appreciation">
                    <div className="like-comment">
                      <div>
                        <AiOutlineLike
                          style={{
                            display: "none",
                            color: "red",
                          }}
                          className="appreciation-icon"
                        />
                        <AiFillLike
                          style={{
                            display: "block",
                            color: "red",
                          }}
                          className="appreciation-icon"
                        />
                      </div>
                      <div>
                        <VscComment
                          className="appreciation-icon"
                          style={{ color: "black" }}
                        />
                        <span>10</span>
                      </div>
                    </div>
                    <div className="link-bookmark">
                      {/* <AiOutlineShareAlt style={{ color: "black" }} className='link-icon' /> */}
                      <div className="sharing-div">
                        <div
                          style={{ display: showApp ? "" : "none" }}
                          className="share-apps"
                        >
                          <Share link={window.location.href} />
                        </div>
                        <AiOutlineShareAlt
                          onClick={shareToApps}
                          style={{ color: "black" }}
                          className="link-icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="end-dots mt-5"></div>
                </div>
                <div className="comment-section"></div>
              </>
            }
          </section>
          <div className="sec-2-right">
            <div className="container-fluid homepage">
              <section className="right-section">
                <div className="right-blog">
                  <h3 className="featured">
                    <span className="backgroundColor">&nbsp;Popular </span>
                    &nbsp;Posted
                  </h3>
                  <div className="scroll">
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
                                      src={e.authorImage}
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
                                      <p className="publishdate">
                                        {e.publishDate}
                                      </p>
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
                                      <p className="publishdate">
                                        {" "}
                                        {e.readtime}min{" "}
                                      </p>
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
                      <span className="backgroundColor">
                        &nbsp;Popular&nbsp;
                      </span>
                      &nbsp;categories
                    </h3>
                    <div
                      className="all-tags  mt-4"
                      style={{ paddingRight: "80px" }}
                    >
                      <a href={`/tag/Travel`}>
                        <button className="tag">Immunity</button>
                      </a>
                      <a href={`/tag/Lifestyle`}>
                        <button className="tag">Health</button>
                      </a>
                      <a href={`/tag/Fashion`}>
                        <button className="tag">Heart</button>
                      </a>
                      <a href={`/tag/Technology`}>
                        <button className="tag">Drugs</button>
                      </a>
                      <a href={`/tag/Business`}>
                        <button className="tag">Ayurved</button>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Blog;
