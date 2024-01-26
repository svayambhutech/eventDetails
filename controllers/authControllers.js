const User = require('../models/User');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const uploadPDF = async (req, res) => {
  try {
    const { email, name } = req.body;
    console.log('hitttt')
    let cloudUrl;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(req.file, req.file.path)
    user.pdfPath = `http://localhost:3001/uploads/${req.file.filename}`;
    await user.save();   

    res.status(200).json({ message: 'PDF uploaded and linked to user successfully' });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getpdf = async(req,res)=>{
  try{
    const {email} = req.query
    const users = await User.findOne({email});
    res.status(200).json(users.pdfPath)
  }catch(error){
    console.error('Error fetching users:', error);
    res.status(500).json({error: 'Intenal server Error'});
  }
}

module.exports = { registerUser, loginUser, uploadPDF, getAllUsers, getpdf };
