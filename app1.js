// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var cors = require('cors')
// // var jwt = require('jsonwebtoken');
// var database = require('./config/database');
// var swaggerUI = require('swagger-ui-express');
// // var swaggerJsDoc = require('swagger-jsdoc')

// // var morgan = require('morgan');
// // var multer = require('multer');


// var index = require('./routes/index');
// // var users = require('./routes/users');
// // var products = require('./routes/products');
// var protects = require('./middleware/protects');
// var books = require('./routes/books');
// var sendOtp = require('./routes/sendOtp');
// var signUpUser = require('./routes/signUpUser');
// var askQuestionUser = require('./routes/askQuestion');
// var loginUser = require('./routes/loginUser');


// var app = express();
// global.__base = __dirname + "/"
// var swaggerJsDoc = require('swagger-jsdoc');
// var swaggerconf = require('./config/swaggerconf');


// // var swaggerSpec = swaggerJsDoc(swaggerconf.swaggerOptions);
// // var options = {
// //   definition: {
// //     info: {
// //       title: "Swagger API astrology",
// //       version: '1.0.0',
// //       // description: 'astrology-server project'
// //     }
// //   },
// //   apis: ['./app.js']
// // }
// // var swaggerSpec = swaggerJsDoc(options);
// // console.log(swaggerSpec)

// // serve swagger
// // app.get('/swagger.json', function (req, res) {
// //   res.setHeader('Content-Type', 'application/json');
// //   res.send(swaggerSpec);
// // });

// mongoose.Promise = global.Promise;
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(cors())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('morgan')('short'));



// app.use('/', index);


// // app.use('/books',swagger.serve,swaggerUI.setup(swaggerSpec));
// app.use('/api', protects);

// app.use('/api', sendOtp);
// app.use('/api', signUpUser);
// app.use('/api', askQuestionUser);
// app.use('/api', loginUser);

// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// /* configure the storage in multer */

// /** check email send to gmail **/

// console.log("this is db connection", database.dbConnection);

// mongoose.connect(database.dbConnection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
//   .then(() => console.log('connection successfull'))
//   .catch((err) => console.console.error(err));

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// module.exports = app;
