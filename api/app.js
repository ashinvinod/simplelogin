const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
var app = express();
var User = require('./models/User.js')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userData');
var db =  mongoose.connection;
db.on('error', console.log.bind(console, "Connection error!"));
db.once('open', function(callback) {
  console.log("Connection succeeded.");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Registering a new account ti the database
app.post('/register', function(req, res)
{
    var userID = req.body.userID;
    var password = req.body.password;
    var newuser = new User();
    newuser.userID = userID;
    newuser.password = password;
    newuser.save(function(err, savedUser) {
        if (err) {
          console.log(err);
            return res.status(500).send();
        }
        console.log("New registration - " + " UserID = " + userID + " Password = " + password);
        res.status(200).send();
    });
});

// Logging into the account
app.post('/login', function(req, res) {
   var userID = req.body.userID;
   var password = req.body.password;
   User.findOne({userID: userID, password: password}, function(err, user)
   {
     if (err) {
       console.log(err);
       return res.status(500).send();
     }
     else if (!user) {
       console.log("USER NOT FOUND!!!");
       return res.status(404).send();
     }
     else {
       return res.send(user);
     }
  });
});

let port = process.env.PORT || 9001;
app.get('/', function(req, res){
    res.set({
        'Access-control-Allow-Origin': 'http://localhost:3000'
    });
}).listen(port)

module.exports = app;
