const mysql = require("mysql");
const express = require("express");
const { PORT, NODE_ENV } = require("./config");
const { logger } = require("./utils/logger");

const app = express();

const dbConnection = () => {
  try {
    const connection = mysql.createConnection({
      user: "root",
      host: "localhost",
      password: "",
      database: "demoproject",
    });

    connection.connect((error) => {
      if (error) {
        logger.error("Conection not established", error.message);
        throw error;
      } else {
        logger.info(
          `Connection established successfully with ${connection.config.database}`
        );
      }
    });
  } catch (error) {
    logger.error("Error setting up the database connection", error.message);
    throw error;
  }
};

module.exports = dbConnection;
