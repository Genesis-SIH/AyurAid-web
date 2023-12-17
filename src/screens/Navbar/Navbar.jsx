import React, { useContext, useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { ImCross } from "react-icons/im";
import image from "../../assets/test.jpg";
import { getAllBlogs } from "../../apis/Blogs";
import { getUserById } from "../../apis/users";
import { LoginContext } from "../../utils/contextProvider/Context";
import logo from "../../assets/ayuraid.png";
import defaultimage from "../../assets/defaultprofile.png";
import axios from "axios";
function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const { userDetails, setUserDetails } = useContext(LoginContext);
  const [loginPage, setLoginPage] = useState(false);
  const pageRoute = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);
  const logout = async () => {
    let token = localStorage.getItem("JWTFINALTOKEN");
    const res = await axios.get("http://localhost:8000/logout", {
      headers: { Authorization: token },
    });
    if (res.data.status === 201) {
      localStorage.removeItem("JWTFINALTOKEN");
    } else {
      // pageRoute('/')
    }
  };

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("userToken"));
    let loginData = JSON.parse(localStorage.getItem("loginData"));
    getUserById(loginData.id, token).then((data) => {
      console.log(data.data.data.userDetails);
      setUserDetails(data.data.data.userDetails);
    });
  }, []);

  const homeValid = async () => {
    // let token = localStorage.getItem("JWTFINALTOKEN")
    // const res = await axios.get("http://localhost:8000/validuser", { headers: { "Authorization": token } })
    // if (res.data.status === 401 || !res.data.status) {
    //   // pageRoute('/login')
    // }
    // else {
    //   setLoginData(res.data.userValid)
    // }
  };

  return (
    <div>
      <IconContext.Provider value={{ color: "rgba(51, 51, 51, 1)" }}>
        <div className="main-navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <a href="/">
            <img className="logo" src={logo} alt="" />
          </a>
        </div>
        <div></div>
        <nav
          onClick={showSidebar}
          className={sidebar ? "nav-menu active" : "nav-menu"}
        >
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <a
              style={{ textDecoration: "none" }}
              href={`/profile/${userDetails._id}`}
            >
              <div className="profileSection">
                <img
                  className="userProfile"
                  src={`data:image/jpeg;base64,${userDetails.profileImage}`}
                  alt=""
                />
                <div className="user-bio">
                  <h4 className="user-name">{userDetails.username}</h4>
                </div>
              </div>
            </a>

            {SidebarData.map((item, index) => {
              if (item.title === "Logout") {
                return (
                  <>
                    <a href="/login">
                      <li onClick={logout} key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}

                          <span className="nav-icons">{item.title}</span>
                        </Link>
                      </li>
                    </a>
                  </>
                );
              } else {
                return (
                  <li key={index} className={item.cName}>
                    <a href={item.path}>
                      {item.icon}

                      <span className="nav-icons">{item.title}</span>
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
