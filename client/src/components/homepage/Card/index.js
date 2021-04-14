import React from "react";
import axios from "axios";
import Footer from "../../starters/footer.js";
import Header from "../../starters/header.js";
import SizeContext from "./sizeSelectContext.js";
import SizeUL from "./sizeUl.js";
import server from "../../starters/serverChoose.js";
import ProdsContext from "./prodsContext.js";
import Products from "./products.js";

export default function HomePage() {
  const [size, setSize] = React.useState("XS");
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios.get(server + "homeprods").then((res) => {
      setProducts((products) => products.concat(res.data));
    });
  }, []);

  const updateProducts = (prods) => {
    console.log("ppppp", prods);
    // setProducts((products) =>
    //   prods.map((p) => {
    //     console.log(p);
    //     return p;
    //   })
    // );
    setProducts(prods);
  };

  const updateSize = (size) => {
    setSize(size);
  };

  return (
    <ProdsContext.Provider value={{ products, updateProducts }}>
      <SizeContext.Provider value={{ size, updateSize }}>
        <Header />
        <div>
          <div id="wrapper">
            <section className="top-discount-area d-md-flex align-items-center">
              <div className="single-discount-area">
                <h5>Free Shipping &amp; Returns</h5>
                <h6>
                  <a href="#">BUY NOW</a>
                </h6>
              </div>
              <div className="single-discount-area">
                <h5>20% Discount for all dresses</h5>
                <h6>USE CODE: Colorlib</h6>
              </div>
              {/* Single Discount Area */}
              <div className="single-discount-area">
                <h5>20% Discount for students</h5>
                <h6>USE CODE: Colorlib</h6>
              </div>
            </section>

            <section className="shop_grid_area section_padding_100">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-4 col-lg-3">
                    <div className="shop_sidebar_area">
                      <div className="widget size mb-50">
                        <h6 className="widget-title mb-30">Filter by Size</h6>
                        <div className="widget-desc">
                          <SizeUL />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-8 col-lg-9">
                    <div className="shop_grid_product_area">
                      <Products />
                    </div>
                    <div
                      className="shop_pagination_area wow fadeInUp"
                      data-wow-delay="1.1s"
                    ></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </SizeContext.Provider>
    </ProdsContext.Provider>
  );
}
