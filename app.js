const express= require('express')
const { blogs } = require('./model/index.js')
require('./model/index.js')

const app=express()

// const app = require('express')

const{multer,storage,upload}= require('./middleware/multerConfig.js')


app.use(express.json())
app.use(express.urlencoded({extended: true}))

//telling node to require and use .env file
require('dotenv').config()


app.set("view engine" , "ejs")//for  server side rendering asking node js to user ejs

app.get('/',function(req,res){
    
     res.render('home.ejs')
})

app.get('/addBlog',function(req,res){
res.render('addBlog.ejs')
})

app.post('/addBlog',upload.single('image'),async function(req,res){
      console.log("API HIT VAYO")
      console.log(req.body)
      console.log(req.file)
      
const {title,subtitle,description}= req.body
    await  blogs.create({
            title:title,
            subTitle: subtitle,
           description: description,
           imageUrl:req.file.filename

      })

      res.status(200).json({
            message:"success",
            data:{
                  title,subtitle,description
            }
      })
})


const PORT= process.env.PORT
app.listen(PORT,function(req,res){
console.log( ' Running on' +PORT+'http://localhost:3000/')
})