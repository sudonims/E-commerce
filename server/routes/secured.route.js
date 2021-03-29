const router = require("express").Router();
const { orders, verifyPayment } = require("../controllers/secured.controller");

router.post("/orders", orders);

router.post("/verifyPayment", verifyPayment);

// router.post("/update-profile", )

module.exports = router;
