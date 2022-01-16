import React from "react";
import "./login.page.css";

export const Login = () => {
  return (
    <div className="loginContainer">
      <div className="name">
        <h4>Your name</h4>
        <input type="text"></input>
      </div>
      <button className="button">Go</button>
    </div>
  );
};
