const router = require("express").Router();
const { orders, verifyPayment } = require("../controllers/secured.controller");

router.post("/orders", orders);

router.post("/verifyPayment", verifyPayment);

module.exports = router;
