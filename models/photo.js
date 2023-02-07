"use strict";

const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    getPhotoable(options) {
      if (!this.photoableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.photoableType)}`;
      return this[mixinMethodName](options);
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.belongsTo(models.User, {
        foreignKey: "photoableId",
        constraints: false
      });
    }
  }
  Photo.init(
    {
      url: DataTypes.STRING,
      photoableId: DataTypes.INTEGER,
      photoableType: DataTypes.STRING,
      deleteAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Photo"
    }
  );
  Photo.addHook("afterFind", (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.photoableType === "user" && instance.User !== undefined) {
        instance.photoable = instance.User;
      } else if (
        instance.photoableType === "post" &&
        instance.Post !== undefined
      ) {
        instance.photoable = instance.Post;
      }
      // To prevent mistakes:
      delete instance.User;
      delete instance.dataValues.User;
      delete instance.Post;
      delete instance.dataValues.Post;
    }
  });
  return Photo;
};
