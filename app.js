const app = require('express')()
require('dotenv').config()

app.set("view engine" , "ejs") //for  SSR

const PORT= process.env.PORT

app.listen(PORT,function(req,res){
console.log( ' Running on port no http://localhost:3000/'+PORT)
})

app.get('/',function(req,res){
      const page="Home";
     res.render('home.ejs',{page:page})
})
