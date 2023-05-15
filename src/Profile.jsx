import React, { useContext } from "react";
import "./Profile.css";
import { Avatar, Button, Typography } from "@mui/material";
import { UserAuth } from "./Context/AuthContext";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";
import { Carts } from "./Context/Context";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { role } = useContext(Carts);
  const { user, logout } = UserAuth();

  // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  let strDateTime = user?.metadata?.creationTime;
  var myDate = new Date(strDateTime);
  let createDate = myDate.toLocaleString();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();

      localStorage.setItem("user", false);
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  const accDate = moment(createDate).format("Do MMM  YYYY");

  console.log(role?.details);
  return (
    <>
      <div className="d-flex justify-content-between p-4">
        <Link to="/" className="text-decoration-none">
          <Button
            sx={{
              borderRadius: 10,
              backgroundColor: "#feb47b",
              fontSize: { xs: "10px", sm: "8px", md: "10px", lg: "13px" },
              width: { xs: "5rem", sm: "5rem", md: "10rem", lg: "5rem" },
            }}
            variant="contained"
            startIcon={<IoChevronBackCircle />}
          >
            {" "}
            Back
          </Button>
        </Link>
        <Button
          sx={{
            borderRadius: 10,
            backgroundColor: "#feb47b",
            fontSize: { xs: "10px", sm: "8px", md: "10px", lg: "13px" },
            width: { xs: "6rem", sm: "5rem", md: "10rem", lg: "6rem" },
          }}
          variant="contained"
          startIcon={<CgLogOut />}
          onClick={handleLogout}
        >
          {" "}
          LOGOUT
        </Button>
      </div>

      <div className="propage">
        <span className="heading">PROFILE DETAILS</span>
        <div className="profile">
          <div className="left">
            <div className="avatar">
              <Avatar
                sx={{
                  width: 150,
                  height: 140,
                  fontSize: "100px",
                  fontWeight: "600",
                  backgroundColor: "#ff7e5f",
                  color: "whitesmoke",
                  borderStyle: "solid",
                  borderColor: "#ff7e5f",
                }}
              >
                {user?.email?.slice(0, 1).toUpperCase()}
              </Avatar>
            </div>
            <div className="details">
              <div>
                <Typography className="mt-5 fw-bolder">USER NAME</Typography>
                <Typography className="mt-5 fw-bolder">EMAIL</Typography>
                <Typography className="mt-5 fw-bolder">
                  ACCOUNT CREATED
                </Typography>
              </div>
              <div className="d-flex flex-column justify-content-between">
                <span className="det"> {role?.details?.name}</span>
                <span className="det">{user.email}</span>
                <span className="det mb-1">{accDate}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="details1">
              <div>
                <Typography className="mt-5 fw-bolder">FULL NAME</Typography>
                <Typography className="mt-5 fw-bolder">ADDRESS</Typography>
                <Typography className="mt-5 fw-bolder">MOBILE NO</Typography>
                <Typography className="mt-5 fw-bolder">CITY</Typography>
                <Typography className="mt-5 fw-bolder">STATE</Typography>
              </div>
              <div className="d-flex flex-column justify-content-between">
                <span className="det1"> {role?.details?.name}</span>
                <span className="det1"> {role?.details?.address}</span>
                <span className="det1 ">{role?.details?.pno}</span>
                <span className="det1">{role?.details?.city}</span>
                <span className="det1">{role?.details?.sta}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
