import React, { useState } from "react";
import Header from "../Header";
import Loader from "../Loader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const UpdateAdmin = ({ toastOptions, toast }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const updateAdmin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <Loader loading={loading} />
      <Header title="Update Admin" />
      <div className="content_admin">
        <p className="warn">
          *Updating Password will automatically log-out the session*
        </p>
        <div className="admin_edit_menu">
          <form onSubmit={updateAdmin}>
            <div className="inputs">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
              />
            </div>
            <div className="inputs">
              <label>Email</label>
              <input type="text" placeholder="Enter your email" name="email" />
            </div>
            <div className="inputes">
              <label>Password</label>
              <div className="passwordInput">
                <input
                  type={passwordType}
                  placeholder="Enter your password"
                  name="password"
                />
                {passwordType === "password" ? (
                  <AiOutlineEye onClick={togglePassword} />
                ) : (
                  <AiOutlineEyeInvisible onClick={togglePassword} />
                )}
              </div>
            </div>
            <div className="inputs">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
