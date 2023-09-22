const mongoose = require("mongoose")
const urlSchema = new mongoose.Schema({
  url:{
    type: String,
    require: true
  }
});
module.exports = mongoose.models.urlSchemas || mongoose.model("urlSchemas",urlSchema)

