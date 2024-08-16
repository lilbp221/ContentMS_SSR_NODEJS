const express= require('express')
const app=express()
const cookieParser= require('cookie-parser')

const {  blogs } = require('./model/index.js')
require('./model/index.js') //to use table read write update delete functions

const session = require('express-session');
const authMiddleware = require('./middleware/auth.js'); // Import the auth middleware
// const app = require('express')

const{multer,storage,upload}= require('./middleware/multerConfig.js') //importing multerConfigurations
const { where } = require('sequelize')

app.use(express.json())
app.use(express.urlencoded({extended: true})) //to parse urlencoded values from frontend forms
app.use(cookieParser())

app.use(express.static('./uploads/')) // to give access to image in uploads
app.use(express.static('./public/'))
//telling node to require and use .env file
require('dotenv').config()

const { createBlog, renderAllBlog, renderSingleBlog, deleteBlog, editBlog, editBlogRender, handleEditBlog, renderLoginPage, renderRegisterPage, renderAddBlog } = require('./controller/blogController.js')
const { handleLogin, handleRegister } = require('./controller/authController.js')

app.set("view engine" , "ejs")//for  server side rendering asking node js to user ejs

// Set up session management
// app.use(session({
//   secret:"s3cUr3$tr1ngTh@t1sRand0m&Un1qu3", //better store in env file coz its secret
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // Set to true if using HTTPS
// }));

//API's

//render register page
app.get("/register",renderRegisterPage)
  
//render login page
  app.get("/login",renderLoginPage)
  
//register api
  app.post('/register',handleRegister)
  
//login api
  app.post('/login',handleLogin)


// Protected Routes below =>>>>>>>>>>>>>>>>>>>>
// app.use(authMiddleware); // Apply the auth middleware to the routes below
//create Blog API`
app.post('/addBlog',upload.single('image'),authMiddleware.isAuthenticated, createBlog)

//GET ALL Blogs API 
app.get('/' ,renderAllBlog)
  
//Render addBlog.ejs
app.get('/addBlog',authMiddleware.isAuthenticated,renderAddBlog)

//GET SINGLE BLOG API
app.get('/blogs/:id',renderSingleBlog)

//delete blog
  app.get("/delete/:id",authMiddleware.isAuthenticated,deleteBlog)

//edit blog form
app.get('/edit/:id',authMiddleware.isAuthenticated,editBlogRender)

//edit form bata aako post request handle garne
app.post('/edit/:id',upload.single('image'),handleEditBlog)

// Logout Route
app.get('/logout', (req, res) => {
 
    res.redirect('/login');
  });


const PORT= process.env.PORT
app.listen(PORT,function(req,res){
console.log( ' Running on ' +PORT+' http://localhost:3000/')
})

//to clear git cache

//git rm -r --cached (folder name)
//git add . git commit git push