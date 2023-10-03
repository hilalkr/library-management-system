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

    

    const token = jwt.sign({ userId: newUser.id ,name: newUser.name }, process.env.JWT_SECRET_KEY);

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

    
    const token = jwt.sign({ userId: user.id,name: user.name }, process.env.JWT_SECRET_KEY);

    
    res.status(200).json({ token }); 
  } catch (error) {
    console.error('An error occurred while logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
};

const meUser = async (req, res) => { //check session information validation
  try {
    
    const token = req.headers.authorization?.replace("Bearer ", "") || ""; //req.headers.cookie.split("token=")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized access.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token.' });
      }
  
      // req.userId = decoded.userId; 
      console.log(decoded);
      return  res.status(200).json({decoded});
      
      // next();
    });
  } catch (error) {
    console.error('An error occurred while logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in.' });
  }
};
module.exports = { registerUser, loginUser, meUser };