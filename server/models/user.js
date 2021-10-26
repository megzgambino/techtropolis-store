'use strict';

const { passwordHasher } = require('../helpers/index')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     User.hasMany(models.Product, {foreignKey:'UserId'})
    }
  };
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8,50]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instances, options) => {
    instances.password = passwordHasher(instances.password)
  })

  return User;
};