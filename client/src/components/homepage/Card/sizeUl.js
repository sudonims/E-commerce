import React from "react";
import SizeContext from "./sizeSelectContext";

export default function SizeUL() {
  const { size,updateSize } = React.useContext(SizeContext);
  React.useEffect(()=>{
    document.getElementById(size).style.backgroundColor = "#ff084e";
    document.getElementById(size).style.color = "white";
  },[]);
  const updateSizeColor = (e) => {
    var id = e.target.id;
    updateSize(id);
    ["XS", "S", "M", "L", "XL", "XXL"].forEach(sz => {
        document.getElementById(sz).style.background = "none";
        document.getElementById(sz).style.color = "black";
    });
    document.getElementById(id).style.backgroundColor = "#ff084e";
    document.getElementById(id).style.color = "white";
    
  };
  return (
    <ul className="d-flex justify-content-between">
      <li>
        <button style={{width:30}} id="XS" className={"custom-color"} onClick={updateSizeColor}>
          XS
        </button>
      </li>
      <li>
        <button style={{width:30}} id="S" className={"custom-color"} onClick={updateSizeColor}>
          {" "}
          S
        </button>
      </li>
      <li>
        <button style={{width:30}} id="M" className={"custom-color"} onClick={updateSizeColor}>
          {" "}
          M
        </button>
      </li>
      <li>
        <button style={{width:30}} id="L" className={"custom-color"} onClick={updateSizeColor}>
          {" "}
          L
        </button>
      </li>
      <li>
        <button style={{width:30}} id="XL" className={"custom-color"} onClick={updateSizeColor}>
          XL
        </button>
      </li>
      <li>
        <button style={{width:30}} id="XXL" className={"custom-color"} onClick={updateSizeColor}>
          XXL
        </button>
      </li>
    </ul>
  );
}
