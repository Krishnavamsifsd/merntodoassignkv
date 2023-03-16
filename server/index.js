const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const createAccountRoute = require('./routes/createAccount');
const loginRoute = require('./routes/login');
const todoItemRoute = require('./routes/todoItems');

const app = express();
//use express.json() to get data into json format
app.use(express.json());
//Port 
const PORT = process.env.PORT || 5500;

//use cors
app.use(cors());

//connect to mongodb 
mongoose.connect(process.env.DB_CONNECT)
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err))

//routes
app.use('/', createAccountRoute);
app.use('/', loginRoute);
app.use('/todo-items', todoItemRoute);
// error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong!' });
  })
  

//connect to server
app.listen(PORT, () => console.log("Server connected"));
