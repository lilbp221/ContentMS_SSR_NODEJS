const { blogs } = require("../model")
const fs= require('fs')

//createBlog
exports.createBlog=async function(req,res){
     const userId= req.id
const fileName=req.file.filename      
const {title,subtitle,description}= req.body
    await  blogs.create({
            title:title,
            subTitle: subtitle,
           description: description,
           imageUrl:fileName,
           userId:userId


      })
      res.redirect("/");

      // res.status(200).json({
      //       message:"success",
      //       data:{
      //             title,subtitle,description
      //       }
      // })
}

exports.renderAllBlog=async function(req,res){
      const allBlogs=await  blogs.findAll() //returns array values // finding all the data stored in table blogs
       res.render('home.ejs',{blogs:allBlogs})
  }

exports.renderSingleBlog=async function (req,res){
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
  }

exports.deleteBlog=async function(req,res){
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

  }

exports.editBlogRender=async function(req,res){
      const {id}=req.params
      const blog= await blogs.findAll({
            where:{
                  id:id,
            }
      })
      res.render("editBlog.ejs",{blog:blog})
}

exports.handleEditBlog=async function(req,res){
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
}

exports.renderLoginPage=function(req,res){
      res.render('login.ejs',{message:" "})
      }


exports.renderRegisterPage=function(req,res){
      res.render('register.ejs',{message:" Please Register to Continue!"})
      }

exports.renderAddBlog=function(req,res){
      res.render('addBlog.ejs')
      }
