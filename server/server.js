const express = require("express");

var cors = require("cors");
const app = express();

const verifyToken = require("./tokenVerify").verifyToken;
const index = require("./routes/index.route");
const securedRoutes = require("./routes/secured.route");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", index);
app.use("/api", securedRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
