import {
  Avatar,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React from "react";
import { AuthContext } from "../firebase/firebase";
import Footer from "../starters/footer";
import Header from "../starters/header";
import Cookies from "js-cookie";

export default function Product({ prodId }) {
  const { currentUser } = React.useContext(AuthContext);

  const [prod, setProd] = React.useState({
    id: "0xAAA",
    image: "",
    name: "demo",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing`,
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 549.99,
    reviews: [{}, {}, {}],
  });

  React.useEffect(() => {
    // GET from backend
    // setProd({
    //   image: "",
    //   name: "demo",
    //   description: "",
    //   sizes: ["XS", "S", "M", "L", "XL"],
    //   price: 549.99,
    //   reviews: [{}, {}, {}],
    // });
  }, []);

  const submit = (e) => {
    e.preventDefault();
  };
  var cart = Cookies.getJSON("cart");

  const addCart = (e) => {
    e.preventDefault();
    cart.cart.push({
      id: prod.id,
      name: "top",
      price: prod.price,
      image_link: prod.image,
    });
    console.log(cart);
    Cookies.set("cart", cart);
    alert("Added to cart");
  };
  return (
    prod && (
      <div className="flex flex-col">
        <Header />
        <Container style={{ marginTop: 20 }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <img src={prod.image} alt="image" />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <form onSubmit={submit}>
                <input hidden type="text" value={currentUser.uid} name="user" />
                <input hidden type="text" value={prodId} name="prodid" />

                <div className="flex flex-col">
                  <Typography variant="h2" className="font-black">
                    {prod.name}
                  </Typography>
                  <Typography>{prod.description}</Typography>
                  <div className="flex flex-row mt-8">
                    <Typography variant="h5">Size</Typography>
                    <RadioGroup
                      defaultValue={prod.sizes[0]}
                      aria-label="size"
                      name="size"
                    >
                      <div className="flex flex-row">
                        {prod.sizes.map((size) => (
                          <FormControlLabel
                            value={size}
                            control={
                              <Radio
                                icon={
                                  <Avatar
                                    style={{
                                      backgroundColor: "pink",
                                      color: "black",
                                      marginLeft: 10,
                                    }}
                                  >
                                    {size}
                                  </Avatar>
                                }
                              />
                            }
                          />
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-row mt-8">
                    <input
                      hidden
                      type="number"
                      value={prod.price}
                      name="price"
                    />
                    <Typography variant="h4" style={{ marginRight: 20 }}>
                      Price
                    </Typography>
                    <Typography variant="h4">{prod.price}</Typography>
                  </div>
                  <div
                    style={{ justifyContent: "flex-start" }}
                    className="mt-8 flex flex-row"
                  >
                    <Button
                      style={{
                        backgroundColor: "rgb(255, 8, 78)",
                        marginRight: 10,
                        color: "white"
                      }}
                      type="submit"
                    >
                      Buy
                    </Button>
                    <Button
                      style={{ backgroundColor: "rgb(255, 8, 78)" ,color: "white"}}
                      onClick={addCart}
                    >
                      Add to Cart
                    </Button>
                  </div>

                  <div className="mt-8">
                    <Typography variant="h4">
                      Try the product virtually!!!
                    </Typography>
                    <div>
                      <form>
                        <input type="file" />
                      </form>
                    </div>
                  </div>
                </div>
              </form>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </div>
    )
  );
}
