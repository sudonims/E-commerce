const { db } = require("../firebase");

module.exports = {
  getHomeProds: async (req, res) => {
    try {
      const snapShot = await db
        .collection("products")
        .doc("homepage")
        .collection("products")
        .get();

      const prods = snapShot.docs.map((doc) => {
        return doc.data();
      });

      res.status(200).send(prods);
    } catch (err) {
      console.log(err);
      res.status(503).send("Error");
    }
  },
  productsByFilter: async (req, res) => {
    const { size } = req.body;
    try {
      const snapShot = await db
        .collection("products")
        .doc("all")
        .collection("products")
        .where("sizes", "array-contains-any", [size])
        .get();

      const data = snapShot.docs.map((doc) => doc.data());

      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(503).send("Error");
    }
  },
};
