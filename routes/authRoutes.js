const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers')
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const upload = require('../middleware/uploads');

router.post('/register', authController.registerUser);  
router.post('/login', authController.loginUser);
router.post('/uploadpdf', upload.single('pdf') , authController.uploadPDF);
router.get('/allusers', authController.getAllUsers);
router.get('/getflight', authController.getpdf);
 
module.exports = router;
