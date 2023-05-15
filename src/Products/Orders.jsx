import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, query, onSnapshot } from "firebase/firestore";
import { UserAuth } from "../Context/AuthContext";
import { Button } from "@mui/material";
import SingleCard from "./SingleCard";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import moment from "moment/moment";

const Orders = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [workData, setWorkData] = useState([]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const q = query(collection(db, `customer/${user.uid}/order`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let empArray = [];
      querySnapshot.forEach((doc) => {
        empArray.push({ ...doc.data(), id: doc.id });
      });

      setWorkData(empArray);
    });
    return () => unsub();
  }, [user]);
  // console.log('content',workData)
  const customSort = (a, b) => {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);
    if (dateA < dateB) return 1;
    else if (dateA > dateB) return -1;
    return 0;
  };
  workData.sort(customSort);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const arrDate = moment(today).format("DD MMM  YYYY");
  const arrDate1 = moment(yesterday).format("DD MMM  YYYY");

  return (
    <div>
      <h1 className="text-center">Order Details</h1>
      <div className="headbtn">
        <Link className="text-decoration-none" to="/">
          <Button
            sx={{
              borderRadius: 10,
              color: "black",
              fontWeight: "bold",
              backgroundColor: "#d3cce3",
              background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
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
            color: "black",
            fontWeight: "bold",
            backgroundColor: "#d3cce3",
            background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
            fontSize: { xs: "10px", sm: "8px", md: "10px", lg: "13px" },
            width: { xs: "5rem", sm: "6rem", md: "10rem", lg: "6rem" },
          }}
          variant="contained"
          onClick={handleLogout}
          endIcon={<CgLogOut />}
        >
          {" "}
          Logout
        </Button>
      </div>
      <div className="home">
        {workData.length > 0 ? (
          workData.map((data) => {
            let orderDate = data.Date;
            const ordDate = moment(orderDate).format("DD MMM  YYYY");
            // console.log(
            //   arrDate === ordDate
            //     ? "today"
            //     : arrDate1 === ordDate
            //     ? "yesterday"
            //     : "older"
            // );
            // <span className="px-4 fw-bolder">Today </span>
            return (
              <>
                {data?.order?.map((da, i) => {
                  return (
                    <SingleCard
                      item={da}
                      key={i}
                      ordDate={ordDate}
                      some={workData}
                    />
                  );
                })}
              </>
            );
          })
        ) : (
          <p>No items orderd</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
