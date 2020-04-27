const express = require('express');
const connectDB = require('./config/db');
//const router = express.Router();

const app = express();

// Connect Database //
connectDB();

app.get( '/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./api/users'));
app.use('/api/posts', require('./api/posts'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/profile', require('./api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ${PORT}'));


