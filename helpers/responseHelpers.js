const STATUS_SUCCESS = 1;
const STATUS_ERROR = 0;

const Success = (resp, data, description = "", status = STATUS_SUCCESS) => {
  resp.status(200).json({
    status,
    description: description || "",
    data: data || null,
  });
};
const Error = (resp, description = "", status = STATUS_ERROR) => {
  resp.status(200).json({
    status,
    description: description || "",
  });
};

const badRequest = (resp, description = " ") => {
  resp.status(400).json({
    status: STATUS_ERROR,
    description: description || "",
  });
};

const invalidToken = (resp, description = "", status = STATUS_SUCCESS) => {
  resp.status(403).json({
    status,
    description: description || "",
  });
};

const serviceToController = (status, data, description) => {
  return {
    status,
    data,
    description: description || "",
  };
};

const InternalServerError = (res, description, status = STATUS_ERROR) => {
  res.status(500).json({ status, description });
};
module.exports = {
  Success,
  Error,
  badRequest,
  InternalServerError,
  invalidToken,
  serviceToController,
};
