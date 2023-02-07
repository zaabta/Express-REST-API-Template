const models = require("../../../models");
const { Op } = require("sequelize");
const authService = require("../../middleware/services");

const createUser = async ({ username, email, password }) => {
  try {
    const userType = await models.UserType.findOne({ where: { type: "user" } });
    const [user, userCreated] = await models.User.findOrCreate({
      where: {
        [Op.and]: [{ [Op.or]: [{ username }, { email }] }, { deletedAt: null }]
      },
      defaults: {
        username,
        email,
        password: authService.hashPassword(password),
        userTypeId: userType?.id,
        Photo: {
          url: "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
        }
      },
      include: {
        model: models.Photo
      }
    });
    if (!userCreated) return null;
    return user;
  } catch (err) {
    console.error("ERROR --> ", err);
    throw new Error(err);
  }
};

const login = async ({ account, password }) => {
  try {
    const user = await models.User.findOne({
      where: {
        [Op.or]: [{ username: account }, { email: account }],
        deletedAt: null
      },
      include: [models.UserType, models.Photo]
    });
    if (!user) return null;
    return user;
  } catch (err) {
    console.error("ERROR --> ", err);
    throw new Error(err);
  }
};



const getUserById = async ({userId: id})=> {
  try { 
    const currnetUser = await models.User.findOne({
      where:{
        id
      }
    })
    return currnetUser;
  } catch (err) {
    console.error("ERROR --> ", err);
    throw new Error(err);
  }
}

module.exports = {
  createUser,
  login,
  getUserById
};
