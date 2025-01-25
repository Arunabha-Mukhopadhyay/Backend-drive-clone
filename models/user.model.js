const { Type } = require('lucide')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    unique:true,
    minlength:[3,"username must be atleast 3 characters long"]
  },

  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    unique:true,
    minlength:[13,"enter a valid email id "]
  },

  password:{
    type:String,
    required:true,
    trim:true,
    minlength:[5,"password must be of more than 5 characters only"]
  }
})

const user = mongoose.model('user',userSchema);
module.exports = user;