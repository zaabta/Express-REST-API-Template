const authService = require("../auth-services");
const responses = require("../helper/response");

const isAuthenticated = async function (req, res, next) {
  try {
    const token =
      req?.cookies?.jwt ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
    if(!token) return responses.unauthenticated(res);
    const isVerified = await authService.verifyUser(req, res, next, token);
    if(!isVerified) return responses.unauthenticated(res);
    return next();
  } catch (err) {
    console.log("Error -->", err);
    return responses.unauthenticated(res);
  }
};

const isAdmin = function (req, res, next) {
  try { 
    if (req?.user?.type == "admin") return next()
    return responses.failedWithMessage("Unauthorized, need admin access",res)
  } catch (err) {
    console.log("Error -->", err);
    return responses.unauthenticated(res);
  }
};



module.exports = {
  isAuthenticated,
  isAdmin,
};