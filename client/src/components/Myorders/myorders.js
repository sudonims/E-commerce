import React from "react";
import axios from "axios";
import {
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import OwlCarousel from "react-owl-carousel";
import Footer from "../starters/footer";
import Header from "../starters/header";
import { APP } from "../firebase/firebaseConfig";
import server from "../starters/serverChoose";
import { useSnackbar } from "notistack";
import Loading from "../firebase/loding";

const OrderDialog = ({ openid, setOpenId }) => {
  const [data, setData] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    try {
      APP.auth()
        .currentUser.getIdToken()
        .then((token) => {
          axios
            .post(
              server + "api/getorderdetails",
              {
                id: openid.id,
              },
              {
                headers: {
                  authorization: token,
                },
              }
            )
            .then((res) => {
              if (res.status === 200) {
                setData(res.data);
              } else {
                enqueueSnackbar("Error occured while fetching order details", {
                  variant: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              enqueueSnackbar("Error occured while fetching order details", {
                variant: "error",
              });
            });
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("Error occured while fetching order details", {
            variant: "error",
          });
        });
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Error occured while fetching order details", {
        variant: "error",
      });
    }
  }, []);
  console.log(data);
  return data ? (
    <Dialog open={openid.open} onClose={() => setOpenId(null)}>
      <DialogTitle>{openid.id}</DialogTitle>
      <DialogContent>
        <OwlCarousel items={2} className="owl-theme" nav>
          {data.details.map((prod) => {
            return (
              <Card style={{ width: 250 }}>
                <CardMedia
                  component="img"
                  image={prod.image_link}
                  alt="prod_image"
                  height="120"
                />
                <CardContent>
                  <div className="flex flex-col">
                    <div>
                      <p className="text-black font-black">{prod.name}</p>
                    </div>
                    <div>
                      <p className="text-black font-black">Size {prod.size}</p>
                    </div>
                    <div>
                      <p className="text-black font-black">
                        Quantity {prod.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-black font-black">
                        Total: {prod.effectivePrice}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </OwlCarousel>
      </DialogContent>
    </Dialog>
  ) : (
    <Loading />
  );
};

export default function Myorders() {
  const { enqueueSnackbar } = useSnackbar();
  const [ids, setIds] = React.useState([]);
  const [openid, setOpenId] = React.useState(null);

  React.useEffect(() => {
    APP.auth()
      .currentUser.getIdToken()
      .then((token) => {
        axios
          .get(server + "api/myorders", {
            headers: {
              authorization: token,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setIds((ids) => ids.concat(res.data));
            } else {
              throw new Error("Error Occured");
            }
          })
          .catch((err) => {
            console.log(err);
            enqueueSnackbar("Couldn't get orders", {
              variant: "error",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Authentication error. Login Again", {
          variant: "error",
        });
      });
  }, []);

  const handleClick = (e) => {
    setOpenId({
      open: true,
      id: e.target.id,
    });
  };
  return (
    <>
      <Header />
      {openid && <OrderDialog openid={openid} setOpenId={setOpenId} />}
      <Container>
        <p className="text-2xl text-black font-black">My Orders</p>
        <Card style={{ maxWidth: "50%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell style={{ textAlign: "center" }}>Order Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ids.length === 0 && <> You have no order </>}
              {ids.map((id, i) => {
                return (
                  <TableRow>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <ButtonBase
                        style={{ height: "100%", width: "100%" }}
                        onClick={handleClick}
                        id={id}
                      >
                        {id}
                      </ButtonBase>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
