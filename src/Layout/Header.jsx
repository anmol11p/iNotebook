import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { UserContext } from "../context/UserProvider";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  const { token, setToken, darkmode, setdarkMode } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <header
      className={
        darkmode ? "bg-black text-white" : "bg-blue-500 text-white shadow-md"
      }
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-blue-100"
        >
          iNotebook
        </NavLink>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white underline" : "hover:text-blue-100"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-white underline" : "hover:text-blue-100"
            }
          >
            About
          </NavLink>
          {!token ? (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "text-white underline" : "hover:text-blue-100"
                }
              >
                SignUp
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-white underline" : "hover:text-blue-100"
                }
              >
                Login
              </NavLink>
            </>
          ) : (
            <button
              className="text-red-50 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          <button
            className="cursor-pointer "
            onClick={() => setdarkMode(!darkmode)}
          >
            {darkmode ? <CiLight /> : <MdDarkMode />}
          </button>
        </nav>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-blue-500 text-white text-sm font-medium">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className="block hover:text-blue-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={toggleMenu}
            className="block hover:text-blue-100"
          >
            About
          </NavLink>

          {!token ? (
            <>
              <NavLink
                to="/signup"
                onClick={toggleMenu}
                className="block hover:text-blue-100"
              >
                SignUp
              </NavLink>
              <NavLink
                to="/login"
                onClick={toggleMenu}
                className="block hover:text-blue-100"
              >
                Login
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="block text-left hover:text-blue-100"
            >
              Logout
            </button>
          )}

          <button
            className="mt-2 flex items-center gap-2 hover:text-blue-100"
            onClick={() => {
              setdarkMode(!darkmode);
            }}
          >
            {darkmode ? <CiLight /> : <MdDarkMode />}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
