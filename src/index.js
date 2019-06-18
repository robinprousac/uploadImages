const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const { unlink } = require('fs-extra');

const { format } = require('timeago.js');

const app = express();
require('./database');

//configuracion
app.set('views', path.join(__dirname, 'views')); 

app.set('port' , process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//app.use(multer({dest: path.join(__dirname,'public/img/uploads')}).single('image'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));


// Global variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/index.js'));


app.listen(app.get('port'));