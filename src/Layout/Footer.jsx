import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
const Footer = () => {
  const { token, darkmode } = useContext(UserContext);
  const date = new Date();
  const time = date.getFullYear();
  return (
    <div
      className={`${
        darkmode ? "bg-black" : "bg-blue-400"
      } flex flex-col items-center p-2 justify-center text-white`}
    >
      <div className="links flex items-center gap-2 ">
        <NavLink to={"/"}>iNotebook</NavLink>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        {!token && (
          <>
            <NavLink to={"/signup"}>SignUp </NavLink>
            <NavLink to={"/login"}>Login</NavLink>
          </>
        )}
      </div>
      <div className="copyright-sec "> Copyright © {time} Made with ♡</div>
    </div>
  );
};

export default Footer;
