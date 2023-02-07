const { errorResponse, successResponse } = require("./responseMessage");

exports.unauthorized = (res) => {
  return res.status(401).json(errorResponse("unauthorized"));
};

exports.unauthenticated = (res) => {
  return res
    .status(401)
    .json(errorResponse("unauthenticated, please login first"));
};


exports.failedWithMessage = (msg, res) => {
  return res.status(400).json(errorResponse(msg));
};

exports.serverError = (res) => {
  return res
    .status(500)
    .json(errorResponse("something went wrong, please try again later."));
};

exports.forbidden = (res) => {
  return res.status(403).json(errorResponse("forbidden"));
};

exports.notAcceptable = (res) => {
  return res.status(406).json(errorResponse("Not Acceptable"));
};

exports.successWithMessage = (msg, res, data=[]) => {
  return res.status(200).json(successResponse(msg, data));
};

exports.success = (msg, result, res) => {
  return res.status(200).json(successResponse(msg, result));
};