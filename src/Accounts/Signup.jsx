import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/");
    } catch (e) {
      setError(e.code);
      console.log("code", e.code);
      if (e.code === "auth/weak-password") {
        toast.error("Please check the Password");
      }
      if (e.code === "auth/email-already-in-use") {
        toast.error("Email Already In-use Please Use Different Email");
      }
      if (e.code === "auth/invalid-email") {
        toast.error("Please Enter Valid Email and Password");
      }
      if (e.code === "auth/internal-error") {
        toast.error("Please Enter Valid Password");
      }
      if (e.code === "auth/missing-email") {
        toast.error("Please Enter Valid Email");
      }
    }
  };
  const handleNavi = () => {
    navigate("/");
  };
  return (
    <div className="sig">
      <div className="form">
        <span className="headtxt">REGISTER</span>
        <form onSubmit={handleSubmit} className="container">
          <label className="mt-2">
            Email<span className="errmsg">*</span>
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form-control mt-2"
          ></input>

          <label className="mt-2">
            Password <span className="errmsg">*</span>
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control mt-2"
          ></input>

          <button type="submit" onClick={handleNavi} className="logbtn">
            Login
          </button>
          <button onClick={handleSubmit} type="button" className="newbtn">
            Sign-up
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
