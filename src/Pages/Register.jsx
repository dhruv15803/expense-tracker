import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errorMsg,setErrorMsg] = useState("");

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/user/registerUser`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 201) {
        setUsername("");
        setPassword("");
        setEmail("");
        navigate("/login");
      }
    } catch (error) {  
      console.log(error);
      setErrorMsg(error.response.data.message);
      setTimeout(() => {
        setErrorMsg("");
      },3000)
    }
  };

  return (
    <>
      <div className="border-2 rounded-lg shadow-lg m-4 p-4">
        <div className="text-2xl font-bold text-blue-500 my-4">Register</div>
        <form className="flex flex-col gap-2" onSubmit={registerUser}>
          <div className="flex my-2 gap-4 items-center">
            <label htmlFor="username">Enter username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 rounded-lg p-2"
              type="text"
              name="username"
              id="username"
              placeholder="eg:- john123"
            />
          </div>
          <div className="flex my-2 gap-4 items-center">
            <label htmlFor="email">Enter email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 rounded-lg p-2"
              type="email"
              name="email"
              id="email"
              placeholder="eg:- john@gmail.com"
            />
          </div>
          <div className="flex mt-2 gap-4 items-center">
            <label htmlFor="password">Enter password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-lg p-2"
              type={isShowPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="eg:- @#1234john"
            />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <p>Show password</p>
            <input
              checked={isShowPassword}
              onChange={(e) => setIsShowPassword(!isShowPassword)}
              type="checkbox"
              name=""
              id=""
            />
          </div>
          <div className="my-2 text-red-500">
            {errorMsg}
          </div>
          <button className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
            Register
          </button>
          <div className="flex my-2 items-center gap-1">
            <p>Already have an account?</p>
            <Link to='/login' className="text-blue-500">Go to login page</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
