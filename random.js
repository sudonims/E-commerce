const db = require("./firebase").db;

// const uid = blake2b(populate.email).slice(0, 10);
// populate["uid"] = uid;
// delete populate.plaintext_password;
// populate.products.forEach((prod) => {
//   prod["quantity"] = Math.floor(Math.random() * Math.floor(100));
// });
// console.log(populate);
db.collection("products")
  .doc("homepage")
  .collection("products")
  .get()
  .then((docs) => {
    docs.docs.forEach((doc) => {
      var data = doc.data();
      console.log(data);
      data["description"] = "";
      db.collection("products")
        .doc("homepage")
        .collection("products")
        .doc(doc.id)
        .set(data);
    });
  });
