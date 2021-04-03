const { instance } = require("../razorpay");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { db } = require("../firebase");

module.exports = {
  orders: (req, res) => {
    try {
      const { amount, currency, orderDetails, address } = req.body;
      console.log(orderDetails);
      const sha = crypto.createHmac("sha256", "PMFgShL5uukieCrm8aVcEnBW");
      sha.update(JSON.stringify(orderDetails));

      const recipt_id = `receipt_${sha.digest("hex").slice(0, 12)}`;

      instance.orders.create(
        {
          amount: amount,
          currency: currency,
          receipt: recipt_id,
        },
        async (err, order) => {
          console.log(order);
          await db
            .collection("users")
            .doc(req.uid)
            .collection("order")
            .doc(recipt_id)
            .set(
              {
                details: orderDetails,
                address: address,
              },
              {
                merge: true,
              }
            )
            .catch((err) => {
              console.log(err);
              throw new Error("Error OCcured. Check logs");
            });
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
