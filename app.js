var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var http=require("http")

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRouter');
var osRouter = require('./routes/osRouter');
var courseRouter = require('./routes/courseRouter');
const paymentRouter = require('./routes/paymentRoutes');


require("dotenv").config() // config fichier .env

const {connectToMongoDB} = require(".//db/db");

var app = express(); // creation du serveur express 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//bch yarf dossier public

app.use('/', indexRouter); 
app.use('/users', userRouter); //Quand quelqu'un demande /users, utilise le code dans la variable usersRouter qui est  le fichier users.js.
app.use('/os', osRouter); 
app.use('/course', courseRouter); 
app.use('/payments', paymentRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'develo pment' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});


const server=http.createServer(app)
server.listen(process.env.port,()=>{
  connectToMongoDB(), 
  console.log("app is running on port 5000")
}
)
