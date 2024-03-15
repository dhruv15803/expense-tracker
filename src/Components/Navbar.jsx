import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext, backendUrl } from "../App";
import axios from "axios";

const Navbar = () => {
  const { loggedInUser, isLoggedIn,setLoggedInUser,setIsLoggedIn} = useContext(GlobalContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/logoutUser`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setLoggedInUser({});
        setIsLoggedIn(false);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-blue-500 flex items-center p-2 justify-between">
        <div className="text-xl font-bold text-white">
          <Link to="/">Expense tracker</Link>
        </div>
        {isLoggedIn && (
          <div className="flex items-center gap-6 text-white">
            <Link to='/profile'>
            <div className="flex items-center gap-2">
              <img
                className="w-10 rounded-full"
                src={loggedInUser.avatar}
                alt=""
              />
              <p>{loggedInUser.username}</p>
            </div>
            </Link>
            <button className="text-white mx-2" onClick={logoutUser}>
              Logout
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <div className="">
            <Link to="/register">
              <button className="text-white font-semibold">Signup</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
