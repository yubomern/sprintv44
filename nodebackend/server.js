const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const categoryRoutes = require('./routes/categoryRoutes');
const companyRoutes = require('./routes/companyRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require("./routes/courseRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
//app.use(express.static('public'));


app.use(express.static(path.join(__dirname, 'public')));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//uploads 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));


// Routes api 
app.use("/api/courses", courseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/companies', companyRoutes);
//routes templates
app.use('/users', userRoutes);
app.get('/', (req, res) => res.render('index'));
app.get('/categories', (req, res) => res.render('home'));
app.get('/company', (req, res) => res.render('company'));
app.get('/companyhome', (req, res) => res.render('companyhome'));
app.get('/course', (req, res) => res.render('course'));

mongoose.connect('mongodb://localhost:27017/lmsuser', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  });
