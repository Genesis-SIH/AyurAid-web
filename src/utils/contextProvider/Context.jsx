import React from "react";
import { useState } from "react";
import { createContext } from "react";
export const LoginContext = createContext("");

function Context({ children }) {
  const [userDetails, setUserDetails] = useState("");
  console.log(localStorage.getItem("globalLang"));
  const [langGlobal, setLangGlobal] = useState(
    localStorage.getItem("globalLang")
      ? JSON.parse(localStorage.getItem("globalLang"))
      : "English"
  );
  return (
    <LoginContext.Provider
      value={{ userDetails, setUserDetails, langGlobal, setLangGlobal }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default Context;
