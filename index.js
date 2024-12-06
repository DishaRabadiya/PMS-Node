const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { logger } = require("./utils/logger");
const app = express();
const DBconnection = require("./database");
DBconnection();
app.use(cors({ origin: true }));
app.use(express.static("files"));
app.use(async function (req, res, next) {
  // print request URL
  logger.info(`URL ---------:-------- ${req.url}`);
  next();
});

app.use(bodyParser.json({ limit: "1024mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "2048mb",
    extended: false,
    parameterLimit: 102400000000000,
  })
);

// all modules routes
const ProductsRoutes = require("./modules/products.routes");

app.use(ProductsRoutes);

const PORT = 4005;

app.listen(PORT, async () => {
  logger.info(`---- PORT: ${PORT} ----`);
});
