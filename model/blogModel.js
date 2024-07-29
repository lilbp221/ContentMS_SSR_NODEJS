module.exports = (sequelize, DataTypes) => { //(sequelize,DataTypes ) passed from index.js for db
      const Blog = sequelize.define("blog", { //table name is blog
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subTitle: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        imageUrl:{
          type: DataTypes.STRING,
          allowNull: true,
        }
      });
      return Blog
    };
    
    
    // module.exports=()=>{
    
    // }