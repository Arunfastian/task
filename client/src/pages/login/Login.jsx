import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((userData) => ({ ...userData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLogin = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/user/logIn",
          userDetails
        );
        return { status: response.status, data: response.data };
      } catch (error) {
        console.log(error);
      }
    };
    const res = await userLogin();

    if (res?.data?.status === 0) {
      dispatch(login(res.data));
      navigate("/Dashboard");
    } else {
      alert(res.data.messege);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter your username"
            required
            onChange={handleChange}
            value={userDetails.userName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            onChange={handleChange}
            value={userDetails.password}
          />
        </div>
        <input type="submit" value="Login" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default Login;
