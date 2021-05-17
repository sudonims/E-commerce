const {
  productsByFilter,
  getHomeProds,
  getProdId,
} = require("../controllers/index.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("Heelo");
});

router.post("/product-by-filter", productsByFilter);

router.get("/homeprods", getHomeProds);

router.get("/getprod/:id", getProdId);

module.exports = router;
