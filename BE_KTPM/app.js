const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');


const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');

const app = express();
app.use(cors());

app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nhom26_ktpm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});

//kết nối tới collection Account
const Account = require('./models/Account');
//kết nối tới collection User
const User = require('./models/User');
//kết nối tới collection Subject
const Subject = require('./models/Subject');
//kết nối tới collection Class
const Class = require('./models/Class');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.use('/auth', authRoutes);
app.use('/register', registerRoutes);
app.get('/', (req, res) => {
  res.render('home');
});

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
