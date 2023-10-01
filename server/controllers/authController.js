require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../utils/db');


const registerUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, birthDate } = req.body;
    
    
    const existingUser = await User.findOne({ where: { email} });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({ name, email, password: hashedPassword, birthDate });
    await newUser.save();

    

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);

    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (error) {
    console.error('An error occurred while registering the user:', error);
    res.status(500).json({ message: 'An error occurred while registering the user.', error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);

    
    res.status(200).json({ username: user.name, token }); 
  } catch (error) {
    console.error('An error occurred while logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
};


module.exports = { registerUser, loginUser };