import React from "react";
import prod1 from "../../img/product-img/product-1.jpg";
import Cookies from "js-cookie";
import { AuthContext } from "../../firebase/firebase";
import { Button } from "@material-ui/core";

const Card = (props) => {
  var cart = Cookies.getJSON("cart");
  const { currentUser } = React.useContext(AuthContext);

  const addToCart = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please Sign In");
      return;
    }
    if (!currentUser.emailVerified) {
      alert("Please Verify Your Mail Id\nFor that go to Your Profile");
      return;
    }

    var a = cart.cart.find(o => o.id === props.id);

    if(!a)
    cart.cart.push({
      id: props.id,
      name: "top",
      price: props.price,
      image_link: props.img,
      quantity: 1,
      effectivePrice: parseFloat(props.price),
    });

    console.log(cart);
    Cookies.set("cart", cart);
    alert("Added to cart");
  };

  return (
    <>
      <div
        className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig"
        data-wow-delay="0.2s"
      >
        {/* Product Image */}
        <div className="product-img">
          <img src={props.img} alt="" />
          <div className="product-quicview">
            <a
              href={"/product/" + props.id}
              data-toggle="modal"
              data-target="#quickview"
            >
              <i className="ti-plus" />
            </a>
          </div>
        </div>
        {/* Product Description */}
        <div className="product-description">
          <h4 className="product-price">&#8377; {props.price}</h4>
          <p>{props.description}</p>
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
