import React, { useState } from "react";
import logo from "../../Univlogo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    handlePasswordChange(event);
  };

  const login = (event) => {
    event.preventDefault();
    alert("hello");
  };

  return (
    <div className="login_container">
      <div className="login_card">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="inputs">
          <form onSubmit={login}>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              min="3"
              placeholder="Username"
            />
            <div className="passwordInput">
              <input
                type={passwordType}
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              {passwordType === "password" ? (
                <AiOutlineEye onClick={togglePassword} />
              ) : (
                <AiOutlineEyeInvisible onClick={togglePassword} />
              )}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
