const firebaseAdmin = require("./firebase").firebaseAdmin;

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      const tkn = req.headers.authorization;
      firebaseAdmin
        .auth()
        .verifyIdToken(tkn)
        .then((decoded) => {
          req.uid = decoded["uid"];
          console.log("jwt", req.uid);
          next();
        })
        .catch((err) => {
          console.log(err);
          res.status(503).send("Error Occured");
        });
    } catch (err) {
      console.log(err);
      res.status(503).send("Error Occured");
    }
  },
};
