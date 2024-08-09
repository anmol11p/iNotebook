import React from "react";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../context/Notecontext";
import { useContext } from "react";
const Login = () => {
  const { setAlert, Alertgayab } = useContext(NoteContext);

  let navigate = useNavigate();
  //  localStorage.removeItem('token')
  const handlesubmit = async (e) => {
    e.preventDefault();
    let url = "http://localhost:5000/login";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    };
    try {
      const data = await fetch(url, option);
      let json = await data.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        setAlert({ success: "success", opacity: 1, msg: "Login Successfull" });
        Alertgayab();
      } else {
        setAlert({
          success: "danger",
          opacity: 1,
          msg: "Invalid Email or Password",
        });
        Alertgayab();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
