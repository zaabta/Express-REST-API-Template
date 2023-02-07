const { response , validator } = require("../../helper");
const services = require("../services");
const transformers = require("../../transformers");
const authService = require("../../middleware/services");

const store = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirmation } = req?.body;
    if (!username || !email || !password || !passwordConfirmation)
      return response.failedWithMessage(
        "Please fill all required fields !",
        res
      );
    if(validator.emailIsValid(email))
      return response.failedWithMessage("email is invalid !", res);
    if (validator.nameIsValid(username))
      return responses.failedWithMessage("Username is invalid !", res);
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return response.failedWithMessage("Email is invalid !", res);
    if (validator.passwordIsValid(password))
      return response.failedWithMessage("Password is invalid !", res);
    if (password.localeCompare(passwordConfirmation))
      return response.failedWithMessage(
        "Your password and password confirmation are not matching !",
        res
      );
    const user = await services.createUser({ username, email, password });
    if (!user)
      return responses.failedWithMessage("This user is already exists !", res);
    return responses.successWithMessage("user created successfully", res);
  } catch (err) {
    console.log("ERROR -->", err);
    return responses.serverError(res);
  }
};

const login = async (req, res, next) => {
  try {
    const { account, password } = req?.body;
    if (!account || !password)
      return responses.failedWithMessage(
        "Please fill all required fields !",
        res
      );
    const user = await services.login({ account, password });
    if (!user && !authService.comparePasswords(password, user?.password))
      return responses.failedWithMessage("Wrong Email or password", res);
    return responses.successWithMessage("Login successfully", res, {
      user: transformers.userTransformer(user),
      token: authService.signUser(user)
    });
  } catch (err) {
    console.log("ERROR -->", err);
    return responses.serverError(res);
  }
};

const index = async (req, res, next) => {
  try {
    const userId = req?.user?.id
    if(userId) return responses.unauthenticated(res)
    const user = await services.getUserById({userId})
    if(!user) return responses.failedWithMessage("Faild to get current user", res)
    return responses.successWithMessage("User profile get Successfully", res, transformers.userTransformer(user))
  } catch(err) {
    console.log("ERROR--> ", err)
    return responses.serverError(res)
  }
}

module.exports = {
  store,
  index,
  login,
};
