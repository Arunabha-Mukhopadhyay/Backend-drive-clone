const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post(
  '/register',
  body('email').trim().isEmail().isLength({ min: 13 }),
  body('password').trim().isLength({ min: 5 }),
  body('username').trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'invalid data',
      });
    }

    const { email, username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      password: hashPassword,
      username,
    });
    res.json(newUser);
  }
);

router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  body('username').trim().isLength({ min: 5 }),
  body('password').trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'invalid data',
      });
    }

    const { username, password } = req.body;
    
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: 'invalid username or password not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'invalid username or password incorrect',
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    res.cookie('token',token);
    res.send('logged in')
  }
);


// Homepage:-
// router.get('/homepage', (req, res) => {
//   res.render('home');
// });

// router.post('/homepage',async (req,res)=>{
//   const token = req.cookies.token;
//   if(!token){
//     errors = validationResult(req);
//     return res.status(400).json({
//       message:'not authorized'
//     })
//   }

  
// })



module.exports = router;
