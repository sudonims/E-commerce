const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    require("./cloth-match-792e6-firebase-adminsdk-zlud4-4d50e39e80.json")
  ),
});

module.exports = {
  firebaseAdmin: admin,
  db: admin.firestore(),
};
