const express = require("express");
const morgan = require("morgan");
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
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use("/", index);
app.use("/api", verifyToken, securedRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
