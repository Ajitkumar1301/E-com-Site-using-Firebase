import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signin.css";
import Shop from "../assets/shop.jpg";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      // localStorage.setItem('user',true)
      navigate("/");
      //  console.log('navaiuha');
    } catch (e) {
      setError(e.code);
      console.log("code", e.code);
      if (e.code === "auth/wrong-password") {
        toast.error("Please check the Password");
      }
      if (e.code === "auth/user-not-found") {
        toast.error("Please check the Email");
      }
      if (e.code === "auth/invalid-email") {
        toast.error("Please Enter Valid Email and Password");
      }
      if (e.code === "auth/internal-error") {
        toast.error("Please Enter Valid Password");
      }
    }
  };
  const handleNavi = () => {
    navigate("/signup");
  };
  return (
    <div
      className="sig"
      style={{
        backgroundImage: "url(" + Shop + ")",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        color: "#f5f5f5",
      }}
    >
      <div className="form">
        <span className="headtxt">LOGIN</span>
        <form onSubmit={handleSubmit} className="container">
          <label className="mt-2 text-secondary">
            Email <span className="errmsg">*</span>
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form-control mt-2 bg-transparent"
          ></input>

          <label className="mt-2 text-secondary">
            Password <span className="errmsg">*</span>
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control mt-2 bg-transparent"
          ></input>

          <div className="grpbtn">
            <button type="button" onClick={handleNavi} className="logbtn">
              New User
            </button>
            <button type="submit" className="newbtn">
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
