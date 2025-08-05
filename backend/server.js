const express = require('express')
const app = express();

// packages
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

// connection to DB and cloudinary
const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

// routes
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payments');
const event = require(`./routes/event`);
const courseRoutes = require('./routes/course');


const chaptersRoutes = require("./routes/chapters");
const CoursesRoutes  = require('./routes/lecture');
const moduleRoutes = require("./routes/module");


const routes = require("./routes/ToDoRoute");
const uploadRoutes = require("./routes/uploadRoutes");
const  tag  =  require("./controllers/TagController");
const company  = require('./controllers/CompanyController')
const categoryRoutes = require('./routes/categoryRoutes');
const categoriesRoutes  = require('./controllers/categoriesController');
// middleware 
app.use(express.json()); // to parse json body
app.use(cookieParser());
app.use(
    cors({
        // origin: 'http://localhost:5173', // frontend link
        origin: "*",
        credentials: true
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp'
    })
)
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});

// connections
connectDB();
cloudinaryConnect();

// mount route
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/event', event);
app.use('/api/v1/tag', tag);
app.use('/api/v1/company', company);
app.use('/api/categories', categoriesRoutes);
app.use('/lms',  (req,res) => {
    console.log("hello");
    res.send({
        "status" : "ok" ,
        "mesage" : "hello"
    });
});
app.use('/api/events', event);

app.use("/api/chapters", chaptersRoutes);
app.use("/api/module", moduleRoutes);

app.use('/api/courses' ,  CoursesRoutes);
app.use(uploadRoutes);
app.use('/categories', categoryRoutes);
app.get('/', (req, res) => res.render('index'));
app.get('/index', (req, res) => res.render('index'));
app.get('/ca', (req, res) => res.redirect('/categories'));


// Default Route
app.get('/default', (req, res) => {
    // console.log('Your server is up and running..!');
    res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });