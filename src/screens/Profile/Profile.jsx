import React from "react";
import "./Profile.css";
import { BsFacebook } from "react-icons/bs";
import defaultprofile from "../../assets/defaultprofile.png";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../apis/users";
import { useEffect } from "react";
import { useState } from "react";
import { getAuthorBlogs } from "../../apis/Blogs";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import loadingAnimation from "../../assets/loading.gif";
import { LoginContext } from "../../utils/contextProvider/Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  maxWidth: "100%",
  padding: "0px",
};
function Profile() {
  const [userBlogs, setUserBlogs] = useState([]);
  const { userDetails, setUserDetails } = useContext(LoginContext);
  const { langGlobal, setLangGlobal } = useContext(LoginContext);
  const [sameProfile, setSameProfile] = useState(false);
  const [userBlogsExist, setUserBlogsExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const url = "http://localhost:8000";
  const nav = useNavigate();
  const { id } = useParams();
  const userId = userDetails?.id;
  const getUserData = async () => {
    setLoading(true);
    let token = JSON.parse(localStorage.getItem("userToken"));
    const res = await getUserById(id, token);
    const blogRes = await getAuthorBlogs(token, langGlobal);
    if (blogRes.data.data.blogs.length != 0) {
      console.log(blogRes.data.data.blogs);
      setUserBlogs(blogRes.data.data.blogs);
      setUserBlogsExist(true);
      setLoading(false);
    } else {
      setUserBlogsExist(false);
      setLoading(false);
    }
    // console.log(blogRes.data.data.blogs);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {/* <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              style={{
                fontWeight: "600",
                fontSize: "14px",
                borderBottom: "1px solid #dbdbdb",
                paddingTop: "14px",
                paddingBottom: "10px",
                paddingBottom: "10px",
                letterSpacing: "0.4px",
              }}
              className="text-center"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Following
            </Typography>
            <div
              style={{ display: followingSpinner ? "block" : "none" }}
              className="fSpinner"
            >
              <lottie-player
                className="following-spinner"
                src="https://assets8.lottiefiles.com/packages/lf20_ncEPzlAWGW.json"
                background="transparent"
                speed="1"
                style={{ width: "50px", height: "50px" }}
                loop
                autoplay
              ></lottie-player>
            </div>
            {followings.length === 0 ? (
              <div className="nousers">No Followings</div>
            ) : (
              followingsProf.map((e) => {
                return (
                  <>
                    {
                      <div
                        style={{ display: followingSpinner ? "none" : "block" }}
                        className="main-container"
                      >
                        <div className="following-container">
                          <div className="imageFlex">
                            <img
                              className="followingProfile"
                              src={
                                e.profilePic != null
                                  ? e.profilePic
                                  : defaultprofile
                              }
                              alt=""
                            />
                            <div className="fflex">
                              <p className="fUsername">{e.username}</p>
                              <p className="fullName">{e.fullname}</p>
                            </div>
                          </div>
                          <a href={`/profile/${e._id}`}>
                            <button
                              onClick={() => setOpen(false)}
                              className="fBtn"
                            >
                              View
                            </button>
                          </a>
                        </div>
                      </div>
                    }
                  </>
                );
              })
            )}
          </Box>
        </Modal>
        <Modal
          open={followersOpen}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              style={{
                fontWeight: "600",
                fontSize: "14px",
                borderBottom: "1px solid #dbdbdb",
                paddingTop: "14px",
                paddingBottom: "10px",
                paddingBottom: "10px",
                letterSpacing: "0.4px",
              }}
              className="text-center"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Followers
            </Typography>
            <div
              style={{ display: followerSpinner ? "block" : "none" }}
              className="fSpinner"
            >
              <lottie-player
                className="following-spinner"
                src="https://assets8.lottiefiles.com/packages/lf20_ncEPzlAWGW.json"
                background="transparent"
                speed="1"
                style={{ width: "50px", height: "50px" }}
                loop
                autoplay
              ></lottie-player>
            </div>

            {followers.length === 0 ? (
              <div className="nousers">No Followers</div>
            ) : (
              followersProf.map((e) => {
                return (
                  <>
                    {
                      <div
                        style={{ display: followerSpinner ? "none" : "block" }}
                        className="main-container"
                      >
                        <div className="following-container">
                          <div className="imageFlex">
                            <img
                              className="followingProfile"
                              src={
                                e.profilePic != null
                                  ? e.profilePic
                                  : defaultprofile
                              }
                              alt="user profile pic"
                            />
                            <div className="fflex">
                              <p className="fUsername">{e.username}</p>
                              <p className="fullName">{e.fullname}</p>
                            </div>
                          </div>

                          <a href={`/profile/${e._id}`}>
                            <button
                              onClick={() => setOpen(false)}
                              className="fBtn"
                            >
                              View
                            </button>
                          </a>
                        </div>
                      </div>
                    }
                  </>
                );
              })
            )}
          </Box>
        </Modal>
      </div> */}
      <div
        style={{ display: loading ? "block" : "none" }}
        className="loading-animation"
      >
        <div className="loading-div">
          <img
            style={{ width: "200px", height: "200px" }}
            src={loadingAnimation}
            alt=""
          />
        </div>
      </div>
      <div
        style={{ display: loading ? "none" : "block" }}
        className="profile-container"
      >
        <div className="profile-section">
          <button style={{ userSelect: "none" }}>
            <img
              className="profile-image"
              src={
                userDetails?.profileImage
                  ? `data:image/jpeg;base64,${userDetails?.profileImage}`
                  : defaultprofile
              }
              alt=""
            />
          </button>
          <div className="profile-info">
            <div className="follow-flex">
              <h3 className="profile-name">{userDetails?.username}</h3>
              {/* {user._id === userDetails._id ? (
                <a href={`/edit/${user._id} `}>
                  {" "}
                  <button className="edit-btn mt-1">Edit</button>
                </a>
              ) : followers.some((e) => e === userDetails._id) ? (
                <button onClick={() => unfollowBtn()} className="profile-btn">
                  {spinner ? (
                    <lottie-player
                      src="https://assets8.lottiefiles.com/packages/lf20_E4BCpOFrqi.json"
                      background="transparent"
                      speed="1"
                      style={{ width: "250px", height: "250px" }}
                      loop
                      autoplay
                    ></lottie-player>
                  ) : (
                    "Unfollow"
                  )}
                </button>
              ) : (
                <button onClick={() => followBtn()} className="profile-btn">
                  {spinner ? (
                    <lottie-player
                      src="https://assets8.lottiefiles.com/packages/lf20_E4BCpOFrqi.json"
                      background="transparent"
                      speed="1"
                      style={{ width: "250px", height: "250px" }}
                      loop
                      autoplay
                    ></lottie-player>
                  ) : (
                    "Follow"
                  )}
                </button>
              )} */}
            </div>
            {/* <div className="profile-update mt-2 mb-2">
              <button onClick={handleOpen2} className="followers">
                {followers.length} Followers
              </button>
              <button onClick={handleOpen} className="followers">
                {followings.length} Followings
              </button>
            </div> */}

            {/* <p className="profile-description">{user.bio}</p> */}
            {/* <div
              style={{
                display:
                  user.instagram ||
                  user.linkedin ||
                  user.facebook ||
                  user.twitter
                    ? "block"
                    : "none",
              }}
              className="social-links"
            >
              <p className="social-media">Follow On Social Media</p>
              <div className="social-flex">
                <a
                  style={{ display: user.instagram ? "block" : "none" }}
                  target="_blanck"
                  href={user.instagram}
                >
                  <AiFillInstagram className="share-icon-lg" />
                </a>
                <a
                  style={{ display: user.twitter ? "block" : "none" }}
                  target="_blanck"
                  href={user.twitter}
                >
                  <AiFillTwitterCircle className="share-icon-lg" />
                </a>
                <a
                  style={{ display: user.facebook ? "block" : "none" }}
                  target="_blanck"
                  href={user.facebook}
                >
                  <BsFacebook className="share-icon" />
                </a>
                <a
                  style={{ display: user.linkedin ? "block" : "none" }}
                  target="_blanck"
                  href={user.linkedin}
                >
                  <AiFillLinkedin className="share-icon-lg" />
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div style={{ display: loading ? "none" : "block" }} className="my-blogs">
        {userBlogsExist ? (
          !sameProfile ? (
            <h3 className="featured">
              <span className="backgroundColor">&nbsp;Read </span>&nbsp;Author
              Blogs
            </h3>
          ) : (
            <h3 className="featured">
              <span className="backgroundColor">&nbsp;My </span>&nbsp;Blogs
            </h3>
          )
        ) : (
          <div className="noPostFlex">
            <img
              className="no-postImg"
              alt=" "
              src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-3328225-2809510.png"
            />
            <h3 className="featured">
              <span className="backgroundColor">&nbsp;No Blogs </span>&nbsp;Yet
            </h3>
          </div>
        )}

        <div className="my-blogs-flex">
          {userBlogsExist
            ? userBlogs.map((e) => {
                return (
                  <>
                    <a href={`/blog/${e._id}`}>
                      <div className="blog my-blog-single">
                        <img
                          className="blog-image"
                          src={`data:image/jpeg;base64,${e.image}`}
                          alt=""
                        />
                        <p className="category my-blog-category">{e.tag}</p>
                        <h2
                          style={{ fontSize: "20px" }}
                          className="right-blog-title profile-title  mb-2"
                        >
                          {e.title}
                        </h2>
                        <div className="minor-info pt-2">
                          <div className="publishdate">
                            <img
                              className="author-image"
                              src={`data:image/jpeg;base64,${e.authorImage}`}
                              alt=""
                            />
                            &nbsp;{e.authorName}
                            &nbsp;
                          </div>
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
                            <p className="publishdate">{e.readtime} </p>
                          </div>
                        </div>
                        <div
                          className="intro"
                          dangerouslySetInnerHTML={{
                            __html: e.description.slice(0, 150),
                          }}
                        ></div>
                      </div>
                    </a>
                  </>
                );
              })
            : " "}
        </div>
      </div>
    </>
  );
}

export default Profile;
