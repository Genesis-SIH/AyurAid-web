import React, { useEffect, useState } from "react";
import { verifyEmail } from "../../apis/users";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  useEffect(() => {
    verifyEmail(id).then((data) => {
      if (data.data.status == "success") {
        setMessage(
          "Your Email has been verified you can continue on AyurAid app"
        );
      }
    });
  }, []);
  return <div style={{ color: "black" }}>{message}</div>;
};
export default VerifyEmail;
