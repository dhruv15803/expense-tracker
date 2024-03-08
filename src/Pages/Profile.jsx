import React, { useContext, useEffect, useState } from "react";
import { GlobalContext, backendUrl } from "../App";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import bcrypt from "bcryptjs";

const Profile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(GlobalContext);
  const [isUsernameEdit, setIsUsernameEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [passwordUpdateMsg,setPasswordUpdateMsg] = useState("");
  const [usernameUpdateMsg,setUsernameUpdateMsg] = useState("");
  console.log(loggedInUser);

  const editUsername = async () => {
    try {
      const response = await axios.patch(
        `${backendUrl}/user/editUsername`,
        {
          newUsername,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsUsernameEdit(false);
        setNewUsername("");
        setLoggedInUser(response.data.updatedUser);
        setUsernameUpdateMsg(response.data.message);
        setTimeout(()=>{
            setUsernameUpdateMsg("");
        },3000)
      }
    } catch (error) {
      console.log(error);
      setUsernameUpdateMsg(error.response.data.message);
      setTimeout(() => {
        setUsernameUpdateMsg("");
      },3000)
    }
  };

  const editPassword = async () => {
    try {
      const response = await axios.patch(
        `${backendUrl}/user/editPassword`,
        {
          newPassword,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setLoggedInUser(response.data.user);
        setIsPasswordEdit(false);
        setCurrPassword("");
        setNewPassword("");
        setPasswordUpdateMsg(response.data.message);
        setTimeout(() => {
            setPasswordUpdateMsg("");
        },3000)
      }
    } catch (error) {
      console.log(error);
      setPasswordUpdateMsg(error.response.data.message);
      setTimeout(()=>{
        setPasswordUpdateMsg('');
      },3000)
    }
  };

  const checkPassword = async () => {
    const isCorrect = await bcrypt.compare(currPassword, loggedInUser.password);
    setIsPasswordCorrect(isCorrect);
  };

  useEffect(() => {
    checkPassword();
  }, [currPassword]);
  return (
    <>
      <div className=" border-2 flex flex-col m-4 p-2 gap-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-center mb-10">
          <img
            className="rounded-full"
            src={loggedInUser?.avatar}
            alt="profile-image"
          />
        </div>
        <div className="flex items-center text-xl gap-2 mx-10">
          <p>Email:</p>
          <p>{loggedInUser.email}</p>
        </div>
        <div className="flex items-center text-xl gap-2 mx-10">
          <p>Username</p>
          <p>{loggedInUser.username}</p>
          <button
            onClick={() => setIsUsernameEdit(!isUsernameEdit)}
            className="mx-4 text-blue-500"
          >
            {isUsernameEdit ? "Cancel" : <FaEdit />}
          </button>
          {isUsernameEdit && (
            <button onClick={editUsername} className="mx-4 text-blue-500">
              Submit
            </button>
          )}
        </div>
        {isUsernameEdit && (
          <>
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="mx-10 border-2 p-2 rounded-lg"
              type="text"
              name="newUsername"
              id="newUsername"
              placeholder="eg: jack123"
            />
          </>
        )}
        <div className="flex mx-10 my-2 text-xl text-blue-500">
            {usernameUpdateMsg}
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <button
            className="w-1/2  border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
            onClick={() => setIsPasswordEdit(!isPasswordEdit)}
          >
            {isPasswordEdit ? "Cancel" : "edit password"}
          </button>
          {isPasswordEdit && (
            <>
              <label htmlFor="currPassword">Enter current password</label>
              <input
                className="border-2 rounded-lg p-2"
                value={currPassword}
                onChange={(e) => setCurrPassword(e.target.value)}
                type={isShowPassword ? "text" : "password"}
                name="currPassword"
                id="currPassword"
                placeholder="eg: 69420@#john"
              />
              {isPasswordCorrect && (
                <>
                  <label htmlFor="newPassword">Enter new password</label>
                  <input
                    className="border-2 rounded-lg p-2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type={isShowPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    placeholder="eg:new69passwd"
                  />
                </>
              )}
              <div className="flex items-center gap-2">
                <label htmlFor="isShowPassword">show password</label>
                <input
                  checked={isShowPassword}
                  onChange={() => setIsShowPassword(!isShowPassword)}
                  type="checkbox"
                  name="isShowPassword"
                  id="isShowPassword"
                />
              </div>
              <button
                onClick={editPassword}
                className="border-2 p-2 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
              >
                submit
              </button>
            </>
          )}
        <p className="text-blue-500">{passwordUpdateMsg}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
