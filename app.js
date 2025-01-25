const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const connecttoDB = require('./config/db')
connecttoDB()
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index.routes')


const app = express();
app.set('view engine','ejs');
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/',indexRouter);
app.use('/user',userRouter);


app.listen(3000,()=>{
  console.log('server is running on port 3000')
})