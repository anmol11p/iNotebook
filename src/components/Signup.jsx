import React, { useContext, useEffect, useState } from "react";
import { userRegister } from "../api/user";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { FaDartLang } from "react-icons/fa6";

const Signup = () => {
  const { token, setToken, darkmode } = useContext(UserContext);
  const [Loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoader(true);
    try {
      const resp = await userRegister(formData);
      if (resp.status === 201) {
        localStorage.setItem("token", resp.data.token);
        setToken(resp.data.token);
        toast.success(resp.data.message);
        Navigate("/");
      } else if (resp.status === 400) {
        toast.error(resp?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (token) {
      Navigate("/");
    }
  }, [token, Navigate]);
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${
        darkmode ? "bg-gray-950" : " from-blue-100 via-white to-blue-50 px-4"
      }`}
    >
      <div
        className={`w-full max-w-md ${
          darkmode ? "bg-black text-white" : "bg-white"
        }  shadow-lg rounded-xl p-8`}
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Create Your iNotebook Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className={` ${
                darkmode ? "text-white" : "text-gray-700"
              }block text-sm font-medium `}
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className={` ${
                darkmode ? "text-white" : "text-gray-700"
              }block text-sm font-medium `}
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={` ${
                darkmode ? "text-white" : "text-gray-700"
              }block text-sm font-medium `}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className={` ${
                darkmode ? "text-white" : "text-gray-700"
              }block text-sm font-medium `}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={Loader}
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${
              Loader ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {Loader && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {Loader ? "Processing..." : "Sign Up"} {/* Or "Login" */}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-600 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

// anmol
export default Signup;
