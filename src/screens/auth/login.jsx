import React, { useState, useEffect } from "react";
import "./login.css";
import { Colors } from "../../utils";
import AppText from "../../components/AppText";
import TypingAnimation from "../../components/TypingAnimation";
import ayur from "../../assets/ayur.png";
const Login = () => {
  const [isOpened, setIsOpened] = useState(false);

  const gradientStyle = {
    background: `linear-gradient(to top, ${Colors.darkGreen},${Colors.colorBlack},${Colors.darkGreen})`,
    minHeight: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "flex-start", // Adjusted to start from the left

    color: Colors.colorWhite,
    paddingLeft: "20px", // Added left padding for space
  };

  const openModal = () => {
    setIsOpened(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpened(false);
    document.body.style.overflow = "initial";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !isOpened) {
        setIsOpened(true);
        openModal();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpened]);

  return (
    <div>
      <div className="scroll-down">
        <div className="text-column">
          <AppText
            color="#00BC8B"
            fontSize={115}
            style={{
              paddingBottom: "50px",
              paddingLeft: "30px",
              paddingTop: "50px"
            }}
          >
            AyurAid
          </AppText>
          <div style={{ width: "500px" }}>
            <TypingAnimation />
          </div>
          <div>
            <button className="modal-button">Click here to login</button>
          </div>
        </div>
        <div className="image-row">
          <img src={ayur} className="image" alt="Ayur Image" />
        </div>
      </div>
      <div className="container1" style={gradientStyle}></div>
      <div className={`modal ${isOpened ? "is-open" : ""}`}>
        <div class="modal-container">
          <div class="modal-left">
            <h1 class="modal-title">Welcome!</h1>
            <p class="modal-desc">AyurAid blogs 2023</p>
            <div className="input-block">
              <label for="email" className="input-label">
                Email
              </label>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="input-block">
              <label for="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="modal-buttons">
              <a href="" className="">
                Forgot your password?
              </a>
              <button className="input-button">Login</button>
            </div>
            <p className="sign-up">
              Don't have an account? <a href="#">Sign up now</a>
            </p>
          </div>
          <div className="modal-right">
            <img
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
              alt=""
            />
          </div>
          <button className="icon-button close-button" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;