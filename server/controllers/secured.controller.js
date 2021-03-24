const { instance } = require("../razorpay");

module.exports = {
  orders: (req, res) => {
    const { amount, currency, name, email } = req.body;

    instance.orders.create(
      {
        amount: amount,
        currency: currency,
        receipt: "order_rcptid_11",
      },
      (err, order) => {
        console.log(order);
        res.status(200).send(order);
      }
    );
  },
};
