import React from "react";
import prod1 from "../../img/product-img/product-1.jpg";
import Cookies from "js-cookie";

const Card = (props) => {
  var cart = Cookies.getJSON("cart");

  const addToCart = (e) => {
    e.preventDefault();
    cart.cart.push({
      id: props.id,
      name: "top",
      price: props.price,
      image_link: props.img,
    });
    console.log(cart);
    Cookies.set("cart", cart);
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
          <h4 className="product-price">{props.price}</h4>
          <p>{props.description}</p>
          {/* Add to Cart */}
          <form onSubmit={addToCart}>
            <button
              type="submit"
              style={{
                backgroundColor: "rgb(255, 8, 78)",
                color: "white",
                fontWeight: 900,
              }}
              className="add-to-cart-btn"
            >
              ADD TO CART
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Card;
