import { Avatar, ButtonBase, IconButton, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import React from "react";
import server from "../../starters/serverChoose";
import ProdsContext from "./prodsContext";
import SizeContext from "./sizeSelectContext";

const useStyle = makeStyles({
  buttonSelect: {
    backgroundColor: "rgb(255, 8, 78)",
  },
});

export default function SizeUL() {
  const classes = useStyle();
  const [select, setSelect] = React.useState({
    XS: false,
    S: false,
    M: false,
    L: false,
    XL: false,
  });
  const { size, updateSize } = React.useContext(SizeContext);
  const { updateProducts } = React.useContext(ProdsContext);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    updateSizeColor({
      target: {
        id: size,
      },
    });
  }, []);
  const updateSizeColor = (id) => {
    console.log(id);
    var sel = select;
    sel[size] = false;
    sel[id] = true;
    updateSize(id);
    setSelect(sel);
    axios
      .post(server + "product-by-filter", {
        size: id,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          updateProducts(res.data);
        } else {
          enqueueSnackbar("Error Occured", {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error Occured", {
          variant: "error",
        });
      });
  };

  return (
    <div className="flex flex-row">
      <IconButton id="XS" onClick={() => updateSizeColor("XS")}>
        <Avatar className={select["XS"] && classes.buttonSelect}>XS</Avatar>
      </IconButton>
      <IconButton id="S" onClick={() => updateSizeColor("S")}>
        <Avatar className={select["S"] && classes.buttonSelect}>S</Avatar>
      </IconButton>
      <IconButton id="M" onClick={() => updateSizeColor("M")}>
        <Avatar className={select["M"] && classes.buttonSelect}>M</Avatar>
      </IconButton>
      <IconButton id="L" onClick={() => updateSizeColor("L")}>
        <Avatar className={select["L"] && classes.buttonSelect}>L</Avatar>
      </IconButton>
      <IconButton id="XL" onClick={() => updateSizeColor("XL")}>
        <Avatar className={select["XL"] && classes.buttonSelect}>XL</Avatar>
      </IconButton>
    </div>
  );
}
