const db = require("./firebase").db;

// const uid = blake2b(populate.email).slice(0, 10);
// populate["uid"] = uid;
// delete populate.plaintext_password;
// populate.products.forEach((prod) => {
//   prod["quantity"] = Math.floor(Math.random() * Math.floor(100));
// });
// console.log(populate);

const info = [
  {
    id: 1,
    name: "top",
    description: "Cotton Jeans",
    img:
      "https://firebasestorage.googleapis.com/v0/b/cloth-match-792e6.appspot.com/o/products%2Fproduct-2.jpg?alt=media&token=ae61880f-39b2-46e0-bd1e-e1686ea1ed00",
    sizes: ["M", "L", "XL"],
    price: 39.4,
  },
  {
    id: 2,
    name: "cool top",
    description: "The Cooler Cotton Jeans",
    img:
      "https://firebasestorage.googleapis.com/v0/b/cloth-match-792e6.appspot.com/o/products%2Fproduct-3.jpg?alt=media&token=9bf8f2bf-1d4e-4874-9bd4-ef2896cff90e",
    sizes: ["XS"],
    price: 59.4,
  },
  {
    id: 3,
    name: "cool top",
    description: "The Cooler Cotton Jeans",
    img:
      "https://firebasestorage.googleapis.com/v0/b/cloth-match-792e6.appspot.com/o/products%2Fproduct-4.jpg?alt=media&token=3317f370-2b7f-4b8f-b233-8d9e2beb858d",
    sizes: ["XS", "S"],
    price: 59.4,
  },
  {
    id: 4,
    name: "cool top",
    description: "The Cooler Cotton Jeans",
    img:
      "https://firebasestorage.googleapis.com/v0/b/cloth-match-792e6.appspot.com/o/products%2Fproduct-5.jpg?alt=media&token=7eaa1ac7-8934-42a8-988b-9450d4c4f2f7",
    sizes: ["S", "L", "XL"],
    price: 59.4,
  },
  {
    id: 5,
    name: "cool top",
    description: "The Cooler Cotton Jeans",
    img:
      "https://firebasestorage.googleapis.com/v0/b/cloth-match-792e6.appspot.com/o/products%2Fproduct-7.jpg?alt=media&token=d711fc27-8bc2-46cf-a952-ff1a02ea298e",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 59.4,
  },
  {
    id: 6,
    name: "cool top",
    description: "The Cooler Cotton Jeans",
    img:
      "https://firebasestorage.googleapis.com/v0/b/cloth-match-792e6.appspot.com/o/products%2Fproduct-8.jpg?alt=media&token=90cbf079-bbb6-4c2d-b0c3-f27f0ae328cc",
    sizes: ["XS", "S", "L", "XL"],
    price: 59.4,
  },
];

info.forEach((in_) => {
  db.collection("products")
    .doc("all")
    .collection("products")
    .doc(`${in_.id}`)
    .set(in_);

  db.collection("products")
    .doc("homepage")
    .collection("products")
    .doc(`${in_.id}`)
    .set(in_);
});

// db.collection("products").doc("homepage").set({
//   products: info,
// });
