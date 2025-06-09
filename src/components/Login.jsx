import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { userLogin } from "../api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { token, setToken, darkmode } = useContext(UserContext);
  const Navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await userLogin(formData);
      if (resp.status === 201) {
        localStorage.setItem("token", resp.data.token);
        setToken(resp.data.token);
        toast.success(resp.data.message);
        Navigate("/");
      }
      if (resp.status === 404) {
        toast.error(resp.response.data.message);
      }
    } catch (error) {
      console.log(error);
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
        darkmode ? "bg-gray-950" : "from-blue-100 via-white to-blue-50"
      }  px-4`}
    >
      <div
        className={`w-full max-w-md ${
          darkmode ? "bg-black" : "bg-white"
        } shadow-lg rounded-xl p-8`}
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          iNotebook Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
              value={formData.email}
              onChange={handleChange}
              required
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
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
