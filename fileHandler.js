// const mongoose = require("mongoose")
const handleFile = ()=>{

  const fs = require("fs")
  const filenames = fs.readdirSync("./uploads/")
  const multer = require("multer")
  const express = require("express")
  const app = express()

  app.use(express.json());
  app.use(express.urlencoded({extended:false}))
  const storage = multer.diskStorage({
    destination: function(req,file,callback){
      return callback(null,"./uploads")
    },
    filename: function(req,file,callback){
      return callback(null, `${filenames.length+1}_${file.originalname}`)
    }
  })
  const upload = multer({storage})

  app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/upload.html")
  })
  app.post('/upload',upload.single('image'),async(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    return res.send(`${req.file.path}`)
  })
  const port = process.env.PORT ?? 3001;
  app.listen(port,()=>{
    console.log(`Hosting on http://localhost:${port}`)
  })
  //--------------------------handling search----------------------
  app.post("/api/documents",(req,res)=>{
    const query = req.body.documentSearch
    res.sendFile(__dirname+`/uploads/${query}.pdf`)
  })
  
}
// module.exports = mongoose.model('Student',studentSchema)
handleFile()
module.exports = handleFile;
