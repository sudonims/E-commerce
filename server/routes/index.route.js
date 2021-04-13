const {
  productsByFilter,
  getHomeProds,
} = require("../controllers/index.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("Heelo");
});

router.post("/product-by-filter", productsByFilter);

router.get("/homeprods", getHomeProds);

module.exports = router;
