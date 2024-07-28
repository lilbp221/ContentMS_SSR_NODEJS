module.exports = (sequelize, DataTypes) => { //(sequelize,DataTypes ) passed from index.js for db
      const User = sequelize.define("user", { //table name is blog
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userPassword: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userEmail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
      return User
    };
    