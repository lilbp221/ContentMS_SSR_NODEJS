//typically called in app.js makes DB connection first and links all the models

const dbConfig= require('../config/dbConfig')

//getting Sequalize and DataTypes class from sequelize package
const {Sequelize,DataTypes}=require('sequelize')

//making DB connection first
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
// const sequelize = new Sequelize('mysql://root:tfMaLkIVWOgKxftZmJgzrMFCJrPrJpQK@monorail.proxy.rlwy.net:17435/railway', {
//       dialect: 'mysql',
//       pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//       }
//     });

// sequelize.authenticate().
// then( ()=>{
//       console.log("DB CONNECTED SUCCESSFULLY")
// }).
// catch((err)=>{
// console.log("ERROR"+err)
// })


//making db object to hold the instance of Sequelize class i.e. sequelize(object) and class itself
const db={};

db.Sequelize=Sequelize
db.sequelize= sequelize

//importing model files i.e tables and passing the (sequelize,DataTypes) to tables
//the code below likely defines the table blogs in the DB and returns something to db.table_name key

db.blogs= require("./blogModel.js")(sequelize,DataTypes) //sending sequelize and DataTypes to blogModel
db.users= require("./userModel.js")(sequelize,DataTypes) //sending sequelize and DataTypes to blogModel


//RELATIONSHIPS in sequelize hasMany() has() belongsToMany() belongs()

db.users.hasMany(db.blogs)
db.blogs.belongsTo(db.users)




db.sequelize.sync({force:false}).then(()=>{
      console.log("yes re-sync done")
})

//this method syncs all the defined model to database. {force:true} drops the table if already exists so we user false value
module.exports=db;


