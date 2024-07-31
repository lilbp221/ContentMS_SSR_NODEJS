const { users } = require("../model")
const bcrypt= require('bcrypt')

exports.handleLogin=async function(req,res){
      //access email and password

      const {email,password} = req.body
      
      // if(!email || !password){
      //       res.send("Please provide your email or password.")
      // }
      
      const findUser= await users.findAll({ //returns an array of length 1
            where:{
                  email:email, //where email==provided email
            }
      })

      if(findUser.length==0){ //user not found
            res.render('login.ejs',{message:"Invalid email or password"})

      }
      else{ //if user found, check provided password with hased password
            const isPasswordMatched= bcrypt.compareSync(password,findUser[0].password)
            
            if(!isPasswordMatched){
                  res.render('login.ejs',{message:"Invalid email or password"})
            }
            else{
                  req.session.user = findUser; //setting session
                  res.redirect('/')
                  

            }
      }
}

exports.handleRegister=async function(req,res){
      const {name,email,password}= req.body
      const emailExist=await users.findAll({
            where:{
                  email:email
            }
      })
      console.log(emailExist[0])

      if(emailExist.length==0){
            users.create({
                  name,
                  email,
                  password:bcrypt.hashSync(password,10)
            })
      res.render('login.ejs',{message:"Registered successfully!!"})


      }
      else{
            res.render('register.ejs',{message:"Email already exists"})
            
      }
      
      
      
      }