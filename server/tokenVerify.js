const firebaseAdmin = require("./firebase").firebaseAdmin;

module.exports = {
  verifyToken: (req, res, next) => {
    const tkn = req.headers.authorization;

    firebaseAdmin
      .auth()
      .verifyIdToken(tkn)
      .then((decoded) => {
        req.uid = decoded["uid"];
        next();
      })
      .catch((err) => {
        res.status(503).send("Error Occured");
      });
  },
};
