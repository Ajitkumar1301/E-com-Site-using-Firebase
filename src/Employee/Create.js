import React, { useState } from "react";
import { Container, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { UserAuth } from "../Context/AuthContext";

const Create = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();

  const [details, setDetails] = useState({
    name: "",
    age: "",
    address: "",
    sal: "",
    pno: "",
    brand: "",
    role: "vendor",
    id: user.uid,
  });

  const postData = async (e) => {
    const vendorRef = doc(db, "vendor", user.uid);
    e.preventDefault();
    try {
      await setDoc(
        vendorRef,
        {
          details: details,
        },
        navigate("/")
      );
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="create">
      <form onSubmit={postData}>
        <Container
          sx={{
            "& > :not(style)": { m: 2, width: "30ch" },
          }}
        >
          <TextField
            required
            type="text"
            color="warning"
            label="Name"
            variant="outlined"
            name="name"
            onChange={handleChange}
          />
          <TextField
            required
            type="number"
            color="warning"
            label="Age"
            variant="outlined"
            name="age"
            onChange={handleChange}
          />
          <TextField
            required
            type="number"
            color="warning"
            label="Phone No"
            variant="outlined"
            name="pno"
            onChange={handleChange}
          />
          <TextField
            required
            type="text"
            color="warning"
            label="Address"
            variant="outlined"
            name="address"
            onChange={handleChange}
          />
          <TextField
            required
            type="number"
            color="warning"
            label="Salary"
            variant="outlined"
            name="sal"
            onChange={handleChange}
          />
          <TextField
            required
            type="text"
            color="warning"
            label="Brand Name"
            variant="outlined"
            name="brand"
            onChange={handleChange}
          />

          <div className="d-flex justify-content-between">
            <button className="btn btn-primary add">ADD Employee</button>
            <Link to="/">
              <button className="btn btn-danger cancel">Cancel</button>
            </Link>
          </div>
        </Container>
      </form>
    </div>
  );
};

export default Create;
