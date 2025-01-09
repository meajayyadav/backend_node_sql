// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors =require('cors');
const authRoutes = require('./routes/authRoutes');
const { Sequelize } = require('sequelize');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Database Connection
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'userlist'
});

sequelize.authenticate().then(() => {
  console.log('Database connected...');
}).catch(err => {
  console.log('Error: ' + err);
});
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);

// Start the Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
