import React from "react";
import { useState } from "react";
import { createContext } from "react";
export const LoginContext = createContext("");

function Context({ children }) {
  const [userDetails, setUserDetails] = useState("");
  return (
    <LoginContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </LoginContext.Provider>
  );
}

export default Context;
