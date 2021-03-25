import React from "react";

const StepOrderContext = React.createContext({
  activeStep: -1,
  setActiveStep: () => {},
  orderId: "",
  setOrderId: () => {},
  address: {},
  setAddress: () => {},
});

export default StepOrderContext;
