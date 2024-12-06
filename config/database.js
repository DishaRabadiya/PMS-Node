
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("demoproject", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;