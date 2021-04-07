import React from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../firebase/firebase";
import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";

const Card = (props) => {
  const { currentUser } = React.useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const addToCart = (e) => {
    var cart = Cookies.getJSON("cart");
    e.preventDefault();
    if (!currentUser) {
      {
        enqueueSnackbar("Please join us First!!", {
          variant: "info",
        });
      }
      return;
    }
    if (!currentUser.emailVerified) {
      {
        enqueueSnackbar("Please verify your email\nFor that go to My Profile", {
          variant: "info",
        });
      }
      return;
    }

    var a = cart.cart.find((o) => o.id === props.info.id);

    if (!a) {
      cart.cart.push({
        id: props.info.id,
        name: props.info.name,
        description: props.info.description,
        price: props.info.price,
        image_link: props.info.img,
        quantity: 1,
        effectivePrice: parseFloat(props.info.price),
      });

      {
        enqueueSnackbar("Item is added to cart successfully!!", {
          variant: "success",
        });
      }
    } else {
      {
        enqueueSnackbar("Already Added", {
          variant: "info",
        });
      }
    }
    console.log(cart);
    Cookies.set("cart", cart);
  };

  return (
    <>
      <div
        className="col-12 single_gallery_item wow fadeInUpBig"
        data-wow-delay="0.2s"
      >
        {/* Product Image */}
        <div className="product-img">
          <img src={props.info.img} alt="" />
          <div className="product-quicview">
            <a
              href={"/product/" + props.info.id}
              data-toggle="modal"
              data-target="#quickview"
            >
              <i className="ti-plus" />
            </a>
          </div>
        </div>
        {/* Product Description */}
        <div className="product-description">
          <h4 className="product-price">&#8377; {props.info.price}</h4>
          <p>{props.info.description}</p>
          {/* Add to Cart */}
          <form onSubmit={addToCart}>
            <Button
              type="submit"
              style={{
                backgroundColor: "rgb(255, 8, 78)",
                color: "white",
                fontWeight: 900,
              }}
              className="add-to-cart-btn"
            >
              ADD TO CART
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Card;
