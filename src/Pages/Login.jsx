import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext, backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loginErrorMsg,setLoginErrorMsg] = useState("");
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(GlobalContext);

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/user/loginUser`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      if(response.status===200) {
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setLoginErrorMsg(error.response.data.message);
      setTimeout(() => {
        setLoginErrorMsg("");
      },3000)
    }
  };

  return (
    <>
      <div className="border-2 rounded-lg shadow-lg m-4 p-4">
        <div className="text-2xl font-bold text-blue-500 my-4">Login</div>
        <form className="flex flex-col gap-2" onSubmit={loginUser}>
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
              onChange={() => setIsShowPassword(!isShowPassword)}
              type="checkbox"
              name=""
              id=""
            />
          </div>
          <div className="my-2 flex text-red-500">
            {loginErrorMsg}
          </div>
          <button className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
            Login
          </button>
          <div className="flex items-center gap-1">
            <p>Don't have an account</p>
            <Link to="/register" className="text-blue-500">
              Go to register page
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
