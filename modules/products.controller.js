const {
  InternalServerError,
  Success,
  badRequest,
  Error,
} = require("../helpers/responseHelpers");
const { logger } = require("../utils/logger");
const {
  userLoginService,
  userRegistrationService,
} = require("./products.service");

const userRegistrationController = async (req, res) => {
  try {
    const data = await userRegistrationService(req.body);
    if (data.status === 1) {
      Success(res, data.data, data.description);
    } else if (data.status === 2) {
      Error(res, data.description);
    } else if (data.status === 3) {
      badRequest(res, data.description);
    } else if (data.status === 4) {
      InternalServerError(res, data.description);
    }
  } catch (error) {
    logger.error(error);
    logger.error(
      "------------  ERROR FROM : userRegistrationController ------------ "
    );
    InternalServerError(res, "SOMETHING WENT WRONG, PLEASE TRY AGAIN..!");
  }
};

const userLoginController = async (req, res) => {
  try {
    const data = await userLoginService(req.body);
    if (data.status === 1) {
      Success(res, data.data, data.description);
    } else if (data.status === 2) {
      Error(res, data.description);
    } else if (data.status === 3) {
      badRequest(res, data.description);
    } else {
      InternalServerError(res, data.description);
    }
  } catch (error) {
    logger.error(error);
    logger.error(
      "------------  ERROR FROM : userLoginController ------------ "
    );
    InternalServerError(res, "SOMETHING WENT WRONG, PLEASE TRY AGAIN..!");
  }
};

module.exports = {
  userRegistrationController,
  userLoginController,
};
