const JWT= require('jsonwebtoken');

function auth(req,res,next){
  const token = req.cookies.token;    //token are those things that are stored in cookies and are used to authenticate the user
  // cookies are things that are stored in the browser and are used to store the data of the user
  if(!token){
    return res.status(401).json({
      message:'Unauthorized'
    });
  }

  try{
    const decoded = JWT.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    return next();

  }catch(error){
    return res.status(401).json({
      message:'Unauthorized'
    });
  }
}

module.exports = auth;