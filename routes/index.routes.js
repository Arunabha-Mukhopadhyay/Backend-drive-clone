const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const { storage } = require('../config/superbase.config');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middlewares/auth');
const fileModel = require('../models/files.model');
const superbase = require('../config/superbase.config');

router.get('/home', authMiddleware, async (req, res) => {
  const userfiles = await fileModel.find({
    user:req.user.userId
  })
  console.log(userfiles)
  res.render('homepage',{
    files:userfiles
  });

});

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const uniqueName = `${uuidv4()}-${file.originalname}`;
  const { data, error } = await storage
    .from('uploads') // Ensure this matches your bucket name
    .upload(uniqueName, file.buffer);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const newfile = await fileModel.create({
    path: uniqueName,
    originalname: file.originalname,
    user: req.user.userId
  });

  res.json(newfile);
});


router.get('/download/:path', authMiddleware, async (req, res) => {
  try {
    const loggedInUser = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({ user: loggedInUser, path });
    if (!file) return res.status(401).json({ message: 'Unauthorized' });

    // Fixing the Supabase Signed URL Request
    const { data, error } = await superbase.storage
      .from('uploads')
      .createSignedUrl(path, 60);

    if (error) throw error;
    
    console.log(`Generated Signed URL: ${data.signedUrl}`);
    
    res.redirect(data.signedUrl);
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;