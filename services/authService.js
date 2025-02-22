// services/authService.js
const { where } = require('sequelize');
const User = require('../models/user');
const { hashPassword, verifyPassword, generateToken } = require('../utils/authUtils');
const generateRandomUserId = async () => {
  let userId;
  let isUnique = false;

  // Keep generating random userIds until a unique one is found
  while (!isUnique) {
    // Generate a random 4-digit number between 1000 and 9999
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    userId = `USR${randomNumber}`;

    // Check if the generated userId already exists
    const existingUser = await User.findOne({ where: { userId } });
    if (!existingUser) {
      isUnique = true; // UserId is unique, break the loop
    }
  }

  return userId;
};
const registerUser = async (firstName,lastName, email, password) => {
  const exstingUser = await User.findOne({where:{email}})
  if(exstingUser){
    throw new Error('Email Id Already Exist');
  }
  const hashedPassword = await hashPassword(password);
  const userId = await generateRandomUserId();
  const user = await User.create({
    firstName,
    lastName,
    email,
    userId,
    password: hashedPassword,
  });
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Not a register user');
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('user and password did not match !');
  }

  const token = generateToken(user.id);
  return { user, token };
};

module.exports = { registerUser, loginUser };
