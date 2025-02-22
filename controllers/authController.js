// controllers/authController.js
const { registerUser, loginUser } = require('../services/authService');

const signup = async (req, res) => {
  try {
    const { firstName,lastName, email, password } = req.body;
    const user = await registerUser(firstName,lastName, email, password);
    res.status(201).json({error:false, message: 'User registered successfully', user });
  } catch (error) {
    if (error.message === 'Email Id Already Exist') {
      res.status(200).json({ error: true, message: error.message })
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    if (error.message === 'Not a register user') {
      res.status(200).json({ error: true, message: error.message });
    } else {
      res.status(200).json({error:true,message: error.message });
    }
  }
};

module.exports = { signup, login };
