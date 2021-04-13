import React from "react";
import axios from "axios";
import {
  ButtonBase,
  Card,
  Container,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
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
      <DialogContent>{openid.id}</DialogContent>
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
      <Container style={{align:"center"}}>
        <p className="text-2xl text-black font-black">My Orders</p>
        <Card style={{ maxWidth: "50%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell  style={{ textAlign: "center" }}>Order No.</TableCell>
                <TableCell style={{ textAlign: "center" }}>Order Id</TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ids.map((id, i) => {
                return (
                  <TableRow>
                    <TableCell  style={{ textAlign: "center" }}>{i + 1}</TableCell>
                    <TableCell>
                      <ButtonBase
                        style={{ height: "100%", width: "100%" ,textAlign: "center" }}
                        onClick={handleClick}
                        id={id}
                      >
                        {id}
                      </ButtonBase>
                    </TableCell>
                    <TableCell  style={{ textAlign: "center" }}>Will be delievered</TableCell>
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
