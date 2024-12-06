const { logger } = require("../utils/logger");
const models = require("../models/index.model");
const md5 = require("md5");
const { serviceToController } = require("../helpers/responseHelpers");
const sequelize = require("../config/database");

const userRegistrationService = async (userData) => {
  try {
    const existingUser = await sequelize.query(
      `SELECT * FROM users WHERE email = ?`,
      {
        replacements: [userData.email],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (existingUser.length > 0) {
      return serviceToController(2, [], "Email Already Exist.");
    } else {
      const registerUser = await sequelize.query(
        `insert into users (email,uname,password) values (?,?,?)`,
        {
          replacements: [
            userData.email,
            userData.uname,
            md5(userData.password),
          ],
          type: sequelize.QueryTypes.INSERT,
        }
      );

      if (registerUser !== null) {
        return serviceToController(1, registerUser, "Registered SuccessFully");
      } else {
        return serviceToController(2, [], "Registration not SuccessFull");
      }
    }
  } catch (error) {
    logger.error(error);
    logger.error(
      "------------ ERROR FROM : userRegistrationService ------------"
    );
    return serviceToController(4, [], "ERROR FROM : userRegistrationService");
  }
};

const userLoginService = async (loginData) => {
  try {
    const userLogin = await sequelize.query(
      `SELECT * FROM users WHERE email = :email AND password = :password`,
      {
        replacements: {
          email: loginData.email,
          password: md5(loginData.password),
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (userLogin.length > 0) {
      return serviceToController(1, userLogin, "Login SuccessFully");
    } else {
      return serviceToController(2, [], "Email or Password are Invalid");
    }
  } catch (error) {
    logger.error(error);
    logger.error("------------ ERROR FROM : userLoginService ------------");
    return serviceToController(4, [], "ERROR FROM : userLoginService");
  }
};

module.exports = {
  userRegistrationService,
  userLoginService,
};
