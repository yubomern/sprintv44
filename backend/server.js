const express = require('express')
const app = express();

// packages
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");
require('dotenv').config();

// connection to DB and cloudinary
const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

// routes
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
//const paymentRoutes = require('./routes/payments');
const event = require(`./controllers/event`);
const courseRoutes = require('./routes/course');


const chaptersRoutes = require("./routes/chapters");
const CoursesRoutes  = require('./routes/lecture');
const moduleRoutes = require("./routes/module");


const routes = require("./routes/ToDoRoute");
const uploadRoutes = require("./routes/uploadRoutes");



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
//app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/event', event);



app.use("/api/chapters", chaptersRoutes);
app.use("/api/module", moduleRoutes);

app.use('/api/courses' ,  CoursesRoutes);
app.use(uploadRoutes);


// Default Route
app.get('/', (req, res) => {
    // console.log('Your server is up and running..!');
    res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
})