import React from "react";
import axios from "axios";
import {
  Card,
  Container,
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

export default function Myorders() {
  const { enqueueSnackbar } = useSnackbar();
  const [ids, setIds] = React.useState([]);

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

  const handleClick = () => {};
  return (
    <>
      <Header />
      <Container>
        <p className="text-2xl text-black font-black">My Orders</p>

        <Card>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Order Id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ids.map((id, i) => {
                return (
                  <TableRow>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell onClick={handleClick}>{id}</TableCell>
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
