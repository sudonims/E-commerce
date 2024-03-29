const { instance } = require("../razorpay");
const crypto = require("crypto");
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
            .set({
              details: orderDetails,
              address: address,
            })
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

  feedback: async (req, res) => {
    const { subject, message, rating } = req.body;
    try {
      await db.collection("feedback").doc(req.uid).set({
        subject,
        message,
        rating,
      });
      res.status(200).send("success");
    } catch (err) {
      console.log(err);
      res.status(503).send("Error occured");
    }
  },

  myOrders: (req, res) => {
    try {
      const uid = req.uid;
      console.log(uid);
      const orderSnap = db.collection("users").doc(uid).collection("order");

      orderSnap.listDocuments().then((data) => {
        const a = data.map((doc) => doc.id);
        res.status(200).send(a);
      });
    } catch (err) {
      console.log(err);
      res.status(503).send("Error");
    }
  },

  getOrderDetailse: (req, res) => {
    try {
      const uid = req.uid;
      const { id } = req.body;
      console.log(uid, id);
      const orderSnap = db
        .collection("users")
        .doc(uid)
        .collection("order")
        .doc(id);

      orderSnap
        .get()
        .then((data) => {
          res.status(200).send(data.data());
        })
        .catch((err) => {
          console.log(err);
          throw new Error("Error Occured");
        });
    } catch (err) {
      console.log(err);
      res.status(503).send("error");
    }
  },
};
