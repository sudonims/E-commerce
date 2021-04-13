import React from "react";
import SizeContext from "./sizeSelectContext";

export default function SizeUL() {
  const { size, updateSize } = React.useContext(SizeContext);
  const updateSizeColor = (e) => {
    var id = e.target.id;
    updateSize(id);
    ["XS", "S", "M", "L", "XL", "XXL"].forEach(sz => {
        document.getElementById(sz).style.background = "none";
    });
    document.getElementById(id).style.backgroundColor = "black";
  };
  return (
    <ul className="d-flex justify-content-between">
      <li>
        <a id="XS" className={"custom-color"} onClick={updateSizeColor}>
          XS
        </a>
      </li>
      <li>
        <a id="S" className={"custom-color"} onClick={updateSizeColor}>
          {" "}
          S
        </a>
      </li>
      <li>
        <a id="M" className={"custom-color"} onClick={updateSizeColor}>
          {" "}
          M
        </a>
      </li>
      <li>
        <a id="L" className={"custom-color"} onClick={updateSizeColor}>
          {" "}
          L
        </a>
      </li>
      <li>
        <a id="XL" className={"custom-color"} onClick={updateSizeColor}>
          XL
        </a>
      </li>
      <li>
        <a id="XXL" className={"custom-color"} onClick={updateSizeColor}>
          XXL
        </a>
      </li>
    </ul>
  );
}
