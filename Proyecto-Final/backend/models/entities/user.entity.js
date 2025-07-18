const { DataTypes, Model } = require('sequelize');

class User extends Model {}

function initUser(sequelize) {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: ['read']
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: false
  });

  return User;
}

module.exports = initUser;