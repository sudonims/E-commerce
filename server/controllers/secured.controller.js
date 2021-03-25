const { instance } = require("../razorpay");
const crypto = require("crypto");

module.exports = {
  orders: (req, res) => {
    try {
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
    } catch (err) {
      console.log(err);
      res.status(503).send("Error Occured");
    }
  },
  verifyPayment: (req, res) => {
    try {
      const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        order_id,
      } = req.body;

      const shasum = crypto.createHmac("sha256", "PMFgShL5uukieCrm8aVcEnBW");
      shasum.update(order_id + "|" + razorpay_payment_id);
      const digest = shasum.digest("hex");

      console.log(req.body, digest);

      if (digest == razorpay_signature) {
        res.status(200).send("success");
      } else {
        throw new Error("Verification failed");
      }
    } catch (err) {
      console.log(err);
      res.status(503).send("Error Occured");
    }
  },
};
