// // middleware/auth.js
// const authMiddleware = (req, res, next) => {
//   if (req.session && req.session.user) {
//     next(); // User is authenticated, proceed to the next middleware/route handler
//   } else {
//     res.redirect("/login"); // User is not authenticated, redirect to login page
//   }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken')
const { users } = require('../model')
// const {promisify}= require('util')
const promisify= require("util").promisify

exports.isAuthenticated = async (req,res,next)=>
{
  const token= req.cookies.token

  //check if token is given or not  
  if(!token)
    {
    return res.redirect("/login")
    }

//if we dont  want to use promisify
//     await promisify  (jwt.verify) (token,process.env.SECRET_KEY,(error,success)=>{
// if(error){

// }
// else{

// }

    //this is decrypted result of the token saved to cookie
 const decodedResult= await promisify  (jwt.verify) (token,process.env.SECRET_KEY);   
//  console.log(decodedResult)

 //check if that id (userId) exist or not

 const userExist= await users.findAll({
  where:{
    id:decodedResult.id
  }
 })

 if(userExist.length===0){
  res.send("user dont exist")
 }
 else{
  req.id= decodedResult.id || userExist[0].id
  // req.binod= decodedResult.id || userExist[0].id
  next();

 }

}