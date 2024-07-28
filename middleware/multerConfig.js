const multer= require('multer')
const storage= multer.diskStorage({
      destination:function(req,file,cb){
            cb(null,"./uploads") //cb(error,success)
      },
      filename:function(req,file,cb){
            cb(null,Date.now()+file.originalname)
      }
})

const upload= multer({storage:storage,
      limits:{fileSize:1024*1024},
      fileFilter: function(req, file, cb) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(file.mimetype)) {
              cb(new Error('Invalid file type'));
            } else {
              cb(null, true);
            }
            // console.log(Error) //MulterError: File too large //when i sent file above 5 mb
          }
})

module.exports={storage,multer,upload}


//storage gives where to store files and what name to store them