import { Avatar, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import Header from "../header";

export default function Product({ prodId }) {
  const [prod, setProd] = React.useState({
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
              <div className="flex flex-col">
                <Typography variant="h2" className="font-black">
                  {prod.name}
                </Typography>
                <Typography>{prod.description}</Typography>
                <div className="flex flex-row mt-8">
                  <Typography variant="h5">Size</Typography>
                  <div className="flex flex-row">
                    {prod.sizes.map((size) => (
                      <Avatar
                        style={{
                          backgroundColor: "pink",
                          color: "black",
                          marginLeft: 10,
                        }}
                      >
                        {size}
                      </Avatar>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row mt-8">
                  <Typography variant="h4" style={{ marginRight: 20 }}>
                    Price
                  </Typography>
                  <Typography variant="h4">{prod.price}</Typography>
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
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  );
}
