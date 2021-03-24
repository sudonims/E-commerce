const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    require("./cloth-match-792e6-firebase-adminsdk-zlud4-f69f608c74.json")
  ),
});

module.exports = {
  firebaseAdmin: admin,
};
