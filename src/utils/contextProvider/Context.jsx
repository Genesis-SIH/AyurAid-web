import React from "react";
import { useState } from "react";
import { createContext } from "react";
export const LoginContext = createContext("");

function Context({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [langGlobal, setLangGlobal] = useState("en");
  const [loading, setLoading] = useState(true);
  return (
    <LoginContext.Provider
      value={{
        userDetails,
        setUserDetails,
        langGlobal,
        setLangGlobal,
        loading,
        setLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default Context;
