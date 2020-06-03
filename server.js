require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

//Connecting to DB
mongoose.connect(process.env.MONGODB_URI, 
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })

mongoose.connection
.once('open', () => console.log('Connection established to MongoDB'))
.on('error', (err) => console.log('err', err))

const app = express();
app.use(express.json());

// Set headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Accept, Content-Length, Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  res.removeHeader('Access-Control-Allow-Headers');
  next();
});

// Routes
const router = express.Router()

// middleware to use for all requests
app.use((req, res, next) => {
	console.log('Request went through Middleware');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', (req, res, next) => {
	res.json({ message: 'hooray! welcome to our api!' });	
});

const postRouter = require('./routes/post.routes')
app.use('/api', postRouter)

//Defining Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;