const mongoose = require('mongoose')

function connectDB(){
  mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Database connected')
  })
}

module.exports = connectDB; // This is the correct way to export the connectDB function