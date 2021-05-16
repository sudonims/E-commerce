import React from "react";
import ProdsContext from "./prodsContext";
import Card from "./card.js";

export default function Products() {
  const { products } = React.useContext(ProdsContext);
  console.log(products);
  return (
    <div className="flex flex-row flex-wrap">
      {products.map((prod, i) => {
        return (
          <div key={i} style={{ width: 350 }}>
            <Card info={prod} />
          </div>
        );
      })}
    </div>
  );
}
