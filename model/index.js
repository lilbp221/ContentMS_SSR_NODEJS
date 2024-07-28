const dbConfig= require('../config/dbConfig')
const {Sequelize,DataTypes}=require('sequelize')

const sequelize= new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
      host:dbConfig.HOST,
      dialect:dbConfig.dialect,
      // operatorsAliases:false,
      port:3306,
      pool:{
            max:dbConfig.max,
            min:dbConfig.min,
            acquire:dbConfig.acquire,
            idle:dbConfig.idle,
      }
})

sequelize.authenticate().
then( ()=>{
      console.log("DB CONNECTED SUCCESSFULLY")
}).
catch((err)=>{
console.log("ERROR"+err)
})

const db={};

db.Sequelize=Sequelize
db.sequelize= sequelize

//importing model files i.e tables
db.blogs= require("./blogModel.js")(sequelize,DataTypes) //sending sequelize and DataTypes to blogModel
db.users= require("./userModel.js")(sequelize,DataTypes) //sending sequelize and DataTypes to blogModel


db.sequelize.sync({force:false}).then(()=>{
      console.log("yes re-sync done")
})

//this method syncs all the defined model to database. {force:true} drops the table if already exists so we user false value

module.exports=db;
