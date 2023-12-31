import React, { useState, useEffect, useContext } from "react";
import "./login.css";
import { Colors } from "../../utils";
import AppText from "../../components/AppText";
import TypingAnimation from "../../components/TypingAnimation";
import ayur from "../../assets/ayur.png";
import { loginUser, getUserById } from "../../apis/users";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../utils/contextProvider/Context";
import Lottie from "react-lottie";
import animationData from "../../assets/leafLoading.json";

const Login = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [signUpZ, setSignUpZ] = useState(1);
  const [loading, setLoading] = useState(false);
  const { userDetails, setUserDetails } = useContext(LoginContext);
  const { langGlobal, setLangGlobal } = useContext(LoginContext);
  const [loginData, setloginData] = useState({
    identity: "",
    password: "",
  });
  const nav = useNavigate();
  const gradientStyle = {
    background: `linear-gradient(to top, ${Colors.darkGreen},${Colors.colorBlack},${Colors.darkGreen})`,
    minHeight: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "flex-start", // Adjusted to start from the left

    color: Colors.colorWhite,
    paddingLeft: "20px", // Added left padding for space
  };

  const closeModal = () => {
    setIsOpened(false);
    document.body.style.overflow = "initial";
  };

  const handleLogin = async () => {
    // console.log(loginData);
    setLoading(true);
    await loginUser(loginData).then((data) => {
      localStorage.setItem("userToken", JSON.stringify(data.data.data.token));
      localStorage.setItem("loginData", JSON.stringify(data.data.data));
      getUserById(data.data.data.id, data.data.data.token).then((data) => {
        setUserDetails(data.data.data.userDetails);
        nav("/");
      });
    });
    setLoading(false);
  };

  useEffect(() => {
    localStorage.setItem("globalLang", "en");
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return loading ? (
    <Lottie
      options={defaultOptions}
      height={150}
      width={150}
      style={{ marginTop: "25vh" }}
    />
  ) : (
    <div>
      <div className="scroll-down">
        <div className="text-column">
          <AppText
            color="#00BC8B"
            fontSize={115}
            style={{
              paddingBottom: "50px",
              paddingLeft: "30px",
              paddingTop: "50px",
            }}
          >
            AyurAid
          </AppText>
          <div style={{ width: "500px" }}>
            <TypingAnimation />
          </div>
          <div>
            <button className="modal-button" onClick={() => setIsOpened(true)}>
              Click here to login
            </button>
          </div>
        </div>
        <div className="image-row">
          <img src={ayur} className="image" alt="Ayur Image" />
        </div>
      </div>
      <div className="container" style={gradientStyle}></div>
      <div className={`modal ${isOpened ? "is-open" : ""}`}>
        <div class="modal-container" style={{ zIndex: 2 }}>
          <div class="modal-left">
            <h1 class="modal-title">Welcome!</h1>
            <p class="modal-desc">AyurAid blogs</p>
            <div className="input-block">
              <label for="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email or Username"
                onChange={(e) => {
                  setloginData({
                    ...loginData,
                    identity: e.target.value,
                  });
                }}
              />
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
                onChange={(e) => {
                  setloginData({
                    ...loginData,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="modal-buttons">
              <a
                href=""
                className=""
                style={{ color: "black", fontSize: "18px" }}
              >
                Forgot your password?
              </a>
              <button className="input-button" onClick={handleLogin}>
                Login
              </button>
            </div>
            <p className="sign-up">
              Don't have an account?
              <a onClick={() => setSignUpZ(5)} style={{ cursor: "pointer" }}>
                Sign up now
              </a>
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
        {/* <div class="modal-container" style={{ zIndex: signUpZ }}>
          <div class="modal-left">
            <h1 class="modal-title">Welcome!</h1>
            <p class="modal-desc">AyurAid blogs</p>
            <div className="input-block">
              <label for="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email or Username"
                onChange={(e) => {
                  setloginData({
                    ...loginData,
                    identity: e.target.value,
                  });
                }}
              />
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
                onChange={(e) => {
                  setloginData({
                    ...loginData,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="modal-buttons">
              <button
                className="input-button"
                onClick={handleLogin}
                style={{ marginLeft: "130px" }}
              >
                Login
              </button>
            </div>
            <p className="sign-up">
              Already have an account?
              <a onClick={() => setSignUpZ(1)} style={{ cursor: "pointer" }}>
                Login now
              </a>
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
        </div> */}
      </div>
    </div>
  );
};

export default Login;
