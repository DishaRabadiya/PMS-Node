const { config } = require("dotenv");
config({ path: `.env.${process.env.NODE_ENV || "production"}` });

module.exports = CREDENTIALS = process.env.CREDENTIALS === "true";
module.exports = { NODE_ENV, PORT, DATABASE_NAME, CONNECTION_STRING } =
  process.env;
