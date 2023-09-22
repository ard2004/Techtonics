const mongoose = require("mongoose")
const bugLog = require("../debug/bugLogger.js")
const connectDB = async (uri) =>{
  try {
    mongoose.connect(uri,{
      serverSelectionTimeoutMS: 150000
    }).catch(async (error)=>{
        console.log("The server timed out")
      });
  } catch(e){
    console.error("Error: "+e)
  }
}
module.exports = connectDB;

