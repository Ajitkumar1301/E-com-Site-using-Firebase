import React, { useContext, useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Carts } from "../Context/Context";

const CustomerUpdate = () => {
  const { user } = useContext(Carts);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    age: "",
    address: "",
    email: "",
    pno: "",
    city: "",
    sta: "",
    zip: "",
  });
  const [id, setId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const postData = async () => {
    await updateDoc(
      doc(db, "customers", user?.uid),
      {
        details: details,
      },

      navigate("/customer")
    );
  };

  useEffect(() => {
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
          type="text"
          color="warning"
          label="Name"
          value={details.name}
          variant="outlined"
          name="name"
          onChange={handleChange}
        />
        <TextField
          type="number"
          color="warning"
          label="Phone No"
          value={details.pno}
          variant="outlined"
          name="pno"
          onChange={handleChange}
        />
        <TextField
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
          type="text"
          color="warning"
          label="State"
          value={details.sta}
          variant="outlined"
          name="sta"
          onChange={handleChange}
        />
        <TextField
          required
          type="text"
          color="warning"
          label="City"
          value={details.city}
          variant="outlined"
          name="city"
          onChange={handleChange}
        />
        <TextField
          required
          type="number"
          color="warning"
          label="Zip Code"
          value={details.zip}
          variant="outlined"
          name="zip"
          onChange={handleChange}
        />
        <button className="btn1" onClick={postData}>
          Update Customer
        </button>
      </Container>
    </div>
  );
};

export default CustomerUpdate;
