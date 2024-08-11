const { users } = require("../model")
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

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


exports.handleLogin=async function(req,res){
      //access email and password

      const {email,password} = req.body
      
      //check if email and password is provided so that form cant be bypassed with postman or so.
      if(!email || !password){
            res.send("Please provide your email or password.")
      }
      
      const findUser= await users.findAll({ //returns an array of lenght 1
            where:{
                  email:email, //where email==provided email
            }
      })

      //exist xaina vane -> [ ] , if exist xa vaney [{name:"",email:"",password:"",}]

      if(findUser.length==0){ //user not found
            res.render('login.ejs',{message:"Invalid email or password"})

      }
      else{ //if user found, check provided password with hased password 
            //i.e compareSync(user le login garda haleko PW,table ma store vako hashed pw)
            const isPasswordMatched= bcrypt.compareSync(password,findUser[0].password)
            
            if(!isPasswordMatched){
                  res.render('login.ejs',{message:"Invalid email or password"})
            }
            else{
                  // req.session.user = findUser; //setting session

                  //generate token here using the sign(user id,secret key,option:expiry)
                  const token= jwt.sign({id:findUser[0].id},process.env.SECRET_KEY,{
                        expiresIn:"5m"
                  })
                  // expiresIn:"1d"
                  // console.log(token)

                  res.cookie('token',token)
                  res.redirect('/')
                  

            }
      }
}

