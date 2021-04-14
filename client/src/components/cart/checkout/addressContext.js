import React from "react";

const AddressContext = React.createContext({
  address: null,
  updateAddress: () => {},
});

export default AddressContext;
