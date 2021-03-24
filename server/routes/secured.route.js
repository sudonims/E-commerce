const router = require("express").Router();
const { orders } = require("../controllers/secured.controller");

router.post("/orders", orders);

module.exports = router;
