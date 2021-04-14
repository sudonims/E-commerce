import axios from "axios";
import { useSnackbar } from "notistack";
import React from "react";
import server from "../../starters/serverChoose";
import ProdsContext from "./prodsContext";
import SizeContext from "./sizeSelectContext";

export default function SizeUL() {
  const { size, updateSize } = React.useContext(SizeContext);
  const { updateProducts } = React.useContext(ProdsContext);
  const { enqueueSnackbar } = useSnackbar();
  const updateSizeColor = (e) => {
    var id = e.target.id;
    updateSize(id);
    ["XS", "S", "M", "L", "XL", "XXL"].forEach((sz) => {
      document.getElementById(sz).style.background = "none";
    });
    document.getElementById(id).style.backgroundColor = "black";
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
    <ul className="d-flex justify-content-between">
      <li>
        <button
          style={{ width: 30 }}
          id="XS"
          className={"custom-color"}
          onClick={updateSizeColor}
        >
          XS
        </button>
      </li>
      <li>
        <button
          style={{ width: 30 }}
          id="S"
          className={"custom-color"}
          onClick={updateSizeColor}
        >
          {" "}
          S
        </button>
      </li>
      <li>
        <button
          style={{ width: 30 }}
          id="M"
          className={"custom-color"}
          onClick={updateSizeColor}
        >
          {" "}
          M
        </button>
      </li>
      <li>
        <button
          style={{ width: 30 }}
          id="L"
          className={"custom-color"}
          onClick={updateSizeColor}
        >
          {" "}
          L
        </button>
      </li>
      <li>
        <button
          style={{ width: 30 }}
          id="XL"
          className={"custom-color"}
          onClick={updateSizeColor}
        >
          XL
        </button>
      </li>
      <li>
        <button
          style={{ width: 30 }}
          id="XXL"
          className={"custom-color"}
          onClick={updateSizeColor}
        >
          XXL
        </button>
      </li>
    </ul>
  );
}
