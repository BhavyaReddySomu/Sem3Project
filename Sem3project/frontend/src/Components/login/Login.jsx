import React, { useState } from "react";
import axios from "axios"; 
import "./login.css";
// import { Assets } from "../../utils/assets.js";
import { Link,useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const loginData = {
      email:email,
      password:password,
    };

    let url = "http://localhost:3000/api/admin/login";
    try {

        const response = await axios.post(url, loginData);

        if (response.data.user) {

          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("email", response.data.user.email);
            
          alert("Login successful!");
          navigate("/home"); 
          
        } else {
          alert("Login failed. Username not received.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
      }
    };

  return (
    <div className="login-container">
      <div className="header">
        {/* <img
          src={Assets.logo} // Logo imported from assets
          alt="Web Plus Academy"
          className="logo"
        /> */}
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
      <div className="footer">
        <span>Don't have an account?</span>
        <Link to="/signup" className="register-link">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;