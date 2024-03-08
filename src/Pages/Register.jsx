import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import Loader from "../Components/Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingRegister,setIsLoadingRegister] = useState(false);

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      setIsLoadingRegister(true);
      const response = await axios.post(
        `${backendUrl}/user/registerUser`,
        {
          username,
          email,
          password,
          avatar,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setIsLoadingRegister(false);
      if (response.status === 201) {
        setUsername("");
        setPassword("");
        setEmail("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setIsLoadingRegister(false);
      setErrorMsg(error.response.data.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };

  const getAvatarUrl = async () => {
    try {
      setIsLoadingAvatar(true);
      const response = await axios.post(
        `${backendUrl}/user/getAvatar`,
        {
          avatar,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setIsLoadingAvatar(false);
      if (response.status === 200) {
        setAvatarUrl(response.data.url);
      }
    } catch (error) {
        setIsLoadingAvatar(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAvatarUrl();
  }, [avatar]);

  console.log(isLoadingAvatar);

  if(isLoadingRegister) {
    return <div className="my-[30%] flex justify-center items-center gap-4">
        <Loader/>
        <p className="text-blue-500 text-xl">Registering user</p>
    </div>
  }


  return (
    <>
      <div className="border-2 rounded-lg shadow-lg m-4 p-4">
        <div className="text-2xl font-bold text-blue-500 my-4">Register</div>
        <form className="flex flex-col gap-2" onSubmit={registerUser}>
          <div className="flex my-2 gap-4 items-center">
            <label
              htmlFor="avatar"
              className="border-2 rounded-lg p-2 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
            >
              upload avatar
            </label>
            {avatarUrl!=="" && (
              <img className="w-24 rounded-full" src={avatarUrl} alt="" />
            )}
            <Audio
              height="80"
              width="80"
              color="#3a85f0"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={isLoadingAvatar}
            />
            <input
              onChange={(e) => setAvatar(e.target.files[0])}
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
            />
          </div>
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
          <div className="my-2 text-red-500">{errorMsg}</div>
          <button className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
            Register
          </button>
          <div className="flex my-2 items-center gap-1">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-500">
              Go to login page
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
