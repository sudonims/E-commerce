import React from "react";

const ProdsContext = React.createContext({
  products: null,
  updateProducts: () => {},
});

export default ProdsContext;
