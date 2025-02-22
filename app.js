// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors =require('cors');
const authRoutes = require('./routes/authRoutes');
const { Sequelize } = require('sequelize');
const menuRoutes =require('./routes/menu.routes');
const studentRoutes = require('./routes/student.routes')

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Database Connection
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'schoolmanagement'
});

sequelize.authenticate().then(() => {
  console.log('Database connected...');
}).catch(err => {
  console.log('Error: ' + err);
});
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', menuRoutes);
app.use('/api', studentRoutes);
app.use((req,res,next)=>{
  console.log('request receiving at'+new Date());

  next();
})
app.get('/',(req,res)=>{
res.send('hello world');
})
// Start the Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
