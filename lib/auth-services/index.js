const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  signUser: (user) => {
    const token = jwt.sign(
      {
        email: user?.email,
        id: user?.id,
        name: user?.username,
        type: user?.type
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "10h"
      }
    );
    return token;
  },
  verifyUser: (req, res, next, token) => {
    if (!token) return false;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      req.user = {
        id: decoded?.id,
        email: decoded?.email,
        type: decoded?.type,
        name: decoded.name,
        token: token
      };
      return decoded;
    }
  },
  hashPassword: (plainTextPassword) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  comparePasswords: function (plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
};
