const express = require('express');
const config = require('./config/database');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const users = require('./routes/users');
const betaSignups = require('./routes/beta-signups');

const app = express();

const port = process.env.PORT || 8080;


//middleware
app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', users);
app.use('/beta', betaSignups);
app.use(express.static(__dirname + '/public')); //static loc access

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


//db connection
mongoose.connect(config.database, function(err) {
  if (err) {
    console.log('Not connected to the database: ' + err);
  } else {
    console.log('Successfully connected to MongoDB');
  }
});

// get index
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// });


//server port
app.listen(port, function(){
  console.log('Server: OK --- Port: ' + port);
});
