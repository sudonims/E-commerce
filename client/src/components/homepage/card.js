import React from "react";
import prod1 from '../img/product-img/product-1.jpg'

const Card = (props) =>{
    return (
        <>
            <div className="col-12 col-sm-6 col-lg-4 single_gallery_item wow fadeInUpBig" data-wow-delay="0.2s">
                  {/* Product Image */}
                  <div className="product-img">
                    <img src={props.img} alt="" />
                    <div className="product-quicview">
                      <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus" /></a>
                    </div>
                  </div>
                  {/* Product Description */}
                  <div className="product-description">
                    <h4 className="product-price">{props.price}</h4>
                    <p>{props.description}</p>
                    {/* Add to Cart */}
                    <a href="#" className="add-to-cart-btn">ADD TO CART</a>
                  </div>
            </div>
        </>
    )
}

export default Card;


