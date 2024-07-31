module.exports = (sequelize, DataTypes) => { //(sequelize,DataTypes ) passed from index.js for db
      const User = sequelize.define("user", { //table name is blog
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
      return User
    };
    