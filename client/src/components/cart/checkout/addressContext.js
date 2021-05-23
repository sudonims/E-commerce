import React from "react";

const AddressContext = React.createContext({
  address: {},
  updateAddress: () => {},
});

export default AddressContext;
