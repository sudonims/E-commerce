const router = require("express").Router();
const {
  orders,
  verifyPayment,
  feedback,
  myOrders,
  getOrderDetailse,
} = require("../controllers/secured.controller");

router.post("/orders", orders);

router.post("/verifyPayment", verifyPayment);

router.post("/feedback", feedback);

router.get("/myord", myOrders);
// router.post("/update-profile", )

router.post("/getorderdetails", getOrderDetailse);

module.exports = router;
