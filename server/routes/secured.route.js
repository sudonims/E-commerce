const router = require("express").Router();
const {
  orders,
  verifyPayment,
  feedback,
  myOrders,
} = require("../controllers/secured.controller");

router.post("/orders", orders);

router.post("/verifyPayment", verifyPayment);

router.post("/feedback", feedback);

router.get("/myorders", myOrders);
// router.post("/update-profile", )

module.exports = router;
