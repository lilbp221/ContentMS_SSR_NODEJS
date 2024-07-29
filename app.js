const express= require('express')
const {  blogs } = require('./model/index.js')
require('./model/index.js') //to use table read write update delete functions

const app=express()

// const app = require('express')

const{multer,storage,upload}= require('./middleware/multerConfig.js') //importing multerConfigurations
const { where } = require('sequelize')

// var name= new Array()
// name[1]="binod";
// name[2]="bimal";
// console.log(name[2])



// const name=["binod","bimal"]
// console.log(name[0])

app.use(express.json())
app.use(express.urlencoded({extended: true})) //to parse urlencoded values from frontend forms
app.use(express.static('./uploads')) // to give access to image in uploads

//telling node to require and use .env file
require('dotenv').config()
const fs= require('fs')


app.set("view engine" , "ejs")//for  server side rendering asking node js to user ejs



//create API`
app.post('/addBlog',upload.single('image'),async function(req,res){
      console.log("API HIT VAYO")
      // console.log(req.body)
      // console.log(req.file)
const fileName=req.file.filename      
const {title,subtitle,description}= req.body
    await  blogs.create({
            title:title,
            subTitle: subtitle,
           description: description,
           imageUrl:fileName

      })
      res.redirect("/");

      // res.status(200).json({
      //       message:"success",
      //       data:{
      //             title,subtitle,description
      //       }
      // })
})

//GET ALL API 

app.get('/',async function(req,res){
      const allBlogs=await  blogs.findAll() //returns array values // finding all the data stored in table blogs
       res.render('home.ejs',{blogs:allBlogs})
  })
  
  app.get('/addBlog',function(req,res){
  res.render('addBlog.ejs')
  })

  //GET SINGLE API

  app.get('/blogs/:id',async function (req,res){
      const {id}= req.params
      // res.send("Hello world from "+ id)

      const blog= await blogs.findAll({
            where:{
                  id:id,
                  // name:"Manish"
            }
      })

      res.render('singleBlog.ejs',{blog:blog})

      // console.log(blog[0].imageUrl)
  })

//delete blog
  app.get("/delete/:id",async function(req,res){
      const {id}= req.params
     const oldData= await blogs.findAll({
      where:{
            id:id
      }
     })
     const oldImage=oldData[0].imageUrl
     fs.unlink("./uploads/"+oldImage,(err)=>{
      if(err){
console.log(err)
      }
      else{
            console.log("file")

      }
     })
// console.log(oldimagePath)
      await blogs.destroy({
            where:{
                  id:id
            }
      })

      res.redirect("/");

  })

//edit blog form
app.get('/edit/:id',async function(req,res){
      const {id}=req.params
      const blog= await blogs.findAll({
            where:{
                  id:id,
            }
      })
      res.render("editBlog.ejs",{blog:blog})
})

//edit form bata aako post request handle garne

app.post('/edit/:id',upload.single('image'),async function(req,res){
      const {id}= req.params
      const {title,subtitle,description}=req.body
     const fileName= req?.file?.filename
     const oldData= await blogs.findAll({
      where:{
            id:id
      }
     })
     const oldImage=oldData[0].imageUrl

     if(fileName){
      fs.unlink("./uploads/"+oldImage,(err)=>{
            if(err){
      console.log(err)
            }
            else{
                  console.log("file")
      
            }
           })
     }

     await blogs.update({
      title,
      subTitle:subtitle,
      description,
      imageUrl: fileName ? fileName:oldImage
     },{
      where:{
            id:id,
      }
     })
     res.redirect('/')
})





const PORT= process.env.PORT
app.listen(PORT,function(req,res){
console.log( ' Running on' +PORT+'http://localhost:3000/')
})