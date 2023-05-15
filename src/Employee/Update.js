import React, { useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const Update = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    age: "",
    address: "",
    sal: "",
    pno: "",
  });
  const [id, setId] = useState("");

  const limitChar = 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const postData = async () => {
    await updateDoc(
      doc(db, "employee", id),
      {
        details: details,
      },

      navigate("/read")
    );
  };

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("details")));
    setId(localStorage.getItem("id"));
    setDetails(JSON.parse(localStorage.getItem("details")));
  }, []);

  return (
    <div className="create">
      <Container
        sx={{
          "& > :not(style)": { m: 3, width: "35ch" },
        }}
      >
        <TextField
          required
          type="text"
          color="warning"
          label="Name"
          value={details.name}
          variant="outlined"
          name="name"
          onChange={handleChange}
        />
        <TextField
          required
          type="number"
          color="warning"
          label="Age"
          value={details.age}
          variant="outlined"
          name="age"
          onChange={handleChange}
        />
        <TextField
          required
          type="number"
          color="warning"
          label="Phone No"
          value={details.pno}
          variant="outlined"
          name="pno"
          onChange={handleChange}
        />
        <TextField
          required
          type="text"
          color="warning"
          label="Address"
          value={details.address}
          variant="outlined"
          name="address"
          onChange={handleChange}
        />
        <TextField
          required
          type="number"
          color="warning"
          label="Salary"
          value={details.sal}
          variant="outlined"
          name="sal"
          onChange={handleChange}
        />
        <button className="btn1" onClick={postData}>
          Update Employee
        </button>
      </Container>
    </div>
  );
};

export default Update;
