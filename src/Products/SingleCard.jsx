import { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { Carts } from "../Context/Context";
import { UserAuth } from "../Context/AuthContext";
import moment from "moment/moment";

export default function SingleCard({ item, some, prod, ordDate }) {
  const Globalstate = useContext(Carts);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;
  const vendor = Globalstate.singleVendor;
  const { user } = UserAuth();
  // console.log(Globalstate);

  //  console.log(Object.keys(vendor.details).length);

  // console.log('dateee',orderDate.sort((date1, date2) => date1 - date2));

  return (
    <div className="products">
      <Card
        sx={{
          maxWidth: 285,
          backgroundColor: "#d3cce3",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        {/* <CardMedia
         component="img"
         alt="/"
         sx={{width:'10rem',height:'13rem',marginLeft:'3rem',marginTop:'0.5rem'}}
         image={item.image}
       /> */}
        <CardContent>
          <Typography
            gutterBottom
            sx={{ fontSize: "13px", fontWeight: "bold" }}
            component="div"
          >
            {item.products.iname}
          </Typography>
          <Typography variant="body2">
            <span className="fw-bolder">Price:</span>
            <span className="fw-bolder text-success">
              {" "}
              ₹ {item.products.price}
            </span>
          </Typography>

          <Typography variant="body2">
            <span className="fw-bolder">Quantity:</span>
            <span className="fw-bolder text-success">{item.quantity}</span>
          </Typography>

          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
            variant="body2"
          >
            <span className="fw-bolder">Product Details:</span>
            <br></br>
            {item.products.desc}
          </Typography>
        </CardContent>
        <CardActions>
          {user.uid !== vendor?.details?.id && !some && (
            <div className="d-flex justify-content-center align-items-center w-100">
              {state.some((p) => p.id === item.id) ? (
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => dispatch({ type: "REMOVE", payload: item })}
                >
                  Remove from cart
                </Button>
              ) : (
                <Button
                  size="small"
                  sx={{
                    borderRadius: 1,
                    color: "black",
                    fontWeight: "600",
                    backgroundColor: "#d3cce3",
                    background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
                    fontSize: { xs: "10px", sm: "8px", md: "10px", lg: "13px" },
                    width: {
                      xs: "10rem",
                      sm: "10rem",
                      md: "10rem",
                      lg: "12rem",
                    },
                  }}
                  variant="contained"
                  onClick={() => dispatch({ type: "ADD", payload: item })}
                >
                  Add to cart
                </Button>
              )}
            </div>
          )}
          {some && (
            <Typography variant="body2">
              <span className="fw-bolder">Ordered Date:</span>
              <span className="fw-bolder text-success px-2">{ordDate}</span>
            </Typography>
          )}
        </CardActions>
      </Card>
    </div>
  );
}
