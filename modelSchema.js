// const mongoose = require("mongoose")
const multer = require("multer")
const express = require("express")
const app = express()
app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/test.html")
})
app.use(express.urlencoded({extended:false}))
const storage = multer.diskStorage({
  destination: function(req,file,callback){
    return callback(null,"./uploads")
  },
  filename: function(req,file,callback){
    return callback(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({storage})
app.post('/upload',upload.single('image'),async(req,res)=>{
  console.log(req.body)
  console.log(req.file)
  return res.send(`${req.file.path}`)
})
const port = process.env.PORT ?? 3001;
app.listen(port,()=>{
  console.log(`listening to port ${port}`)
})
// module.exports = mongoose.model('Student',studentSchema)
