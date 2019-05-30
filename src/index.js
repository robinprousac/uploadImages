const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');

const app = express();

//configuracion
app.set('views', path.join(__dirname, 'views')); 

app.set('port' , process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(multer({dest: path.join(__dirname,'public/img/uploads')}).single('image'));

app.use(require('./routes/index.js'));


app.listen(app.get('port'));