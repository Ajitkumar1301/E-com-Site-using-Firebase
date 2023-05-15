import { useContext } from "react";
import { Carts } from "../Context/Context";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { IoChevronBackCircle } from "react-icons/io5";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import "./Cart.css";
import { UserAuth } from "../Context/AuthContext";

const Cart = () => {
  const Globalstate = useContext(Carts);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;
  const role = Globalstate.role;

  console.log("daaaa", role);
  const navigate = useNavigate();

  const { user } = UserAuth();

  // const [orders,setOrders]={
  // id:state.id
  // }
  console.log(role.details);
  console.log(role.details ? true : false);

  const postData = async () => {
    try {
      await addDoc(
        collection(db, `customer/${user.uid}/order`),
        {
          order: state,
          Date: new Date().toUTCString(),
        },
        navigate("/last")
      );
    } catch (err) {
      alert(err);
    }
  };

  const total = state.reduce((total, item) => {
    return total + item.products.price * item.quantity;
  }, 0);

  return (
    <>
      <div className="ms-sm-5 p-3">
        <Link className="text-decoration-none" to="/items">
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
      </div>
      <div className="total">
        <h2>
          Total <h3 style={{ color: "green" }}> ₹ {total}</h3>
        </h2>
        <div className="mb-2">
          {state.length > 0 && (
            <Button
              onClick={postData}
              sx={{
                borderRadius: 10,
                color: "black",
                fontWeight: "600",
                backgroundColor: "#d3cce3",
                background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
                fontSize: { xs: "10px", sm: "8px", md: "10px", lg: "13px" },
                width: { xs: "10rem", sm: "10rem", md: "10rem", lg: "12rem" },
              }}
              variant="contained"
            >
              Proceed to Checkout
            </Button>
          )}
        </div>
      </div>

      <div className="home">
        {state.length > 0 ? (
          state.map((item, index) => {
            return (
              <div className="products" key={index}>
                <Card
                  sx={{
                    maxWidth: 285,
                    backgroundColor: "#d3cce3",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                  }}
                >
                  {/* {console.log(item.quantity)} */}
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ fontSize: "13px", fontWeight: "bold" }}
                      component="div"
                    >
                      {item.products.iname}
                    </Typography>
                    <Typography variant="body2">
                      {item.quantity < 2 ? (
                        <span className="fw-bolder text-success">
                          {" "}
                          ₹ {(item.quantity * item.products.price).toFixed(0)}
                        </span>
                      ) : (
                        <span className="fw-bolder text-success">
                          <span className="text-secondary">
                            {" "}
                            {item.quantity}
                          </span>{" "}
                          *{" "}
                          <span className="text-dark">
                            {item.products.price}
                          </span>{" "}
                          = ₹ {item.quantity * item.products.price}
                        </span>
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div className="quantity">
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          fontSize: "18px",
                          fontWeight: "bolder",
                          color: "black",
                          backgroundColor: "#d9d3e6",
                        }}
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch({ type: "DECREASE", payload: item });
                          } else {
                            dispatch({ type: "REMOVE", payload: item });
                          }
                        }}
                      >
                        -
                      </Button>
                      <p className="fw-bolder">{item.quantity}</p>

                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          fontSize: "18px",
                          fontWeight: "bolder",
                          color: "black",
                          backgroundColor: "#d9d3e6",
                        }}
                        onClick={() =>
                          dispatch({ type: "INCREASE", payload: item })
                        }
                      >
                        +
                      </Button>
                    </div>
                  </CardActions>
                  <CardActions>
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          fontSize: "10px",
                          fontWeight: "bolder",
                          backgroundColor: "red",
                        }}
                        onClick={() =>
                          dispatch({ type: "REMOVE", payload: item })
                        }
                      >
                        Remove From Cart
                      </Button>
                    </div>
                  </CardActions>
                </Card>
              </div>
            );
          })
        ) : (
          <p className="empty">Your cart is Empty</p>
        )}
      </div>
    </>
  );
};

export default Cart;
