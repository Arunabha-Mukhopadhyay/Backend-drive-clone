const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  path:{
    type:String,
    required:[true,'path is required'],
  },
  originalname:{
    type:String,
    required:[true,'originalname is required'],
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,    // type will give the object id of the user
    ref:'users',   // ref will refer to the user model
    required:[true,'user is required'],
  }
});

const File = mongoose.model('files',fileSchema);
module.exports = File;