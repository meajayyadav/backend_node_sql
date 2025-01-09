// services/authService.js
const User = require('../models/user');
const { hashPassword, verifyPassword, generateToken } = require('../utils/authUtils');

const registerUser = async (name, email, password) => {
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id);
  return { user, token };
};

module.exports = { registerUser, loginUser };
