var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport     = require('passport');
var SamlStrategy = require('passport-saml').Strategy;
var fs           = require('fs');
var session      = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// configure Session
app.use(session({
  secret            : "some secret",
  saveUninitialized : true,
  resave            : false
}));

// configure SAML Strategy
passport.use(
  new SamlStrategy({
    path             : '/login/callback',
    entryPoint       : 'https://bssobeta.bloomberg.com/idp/SSO.saml2',
    issuer           : 'WebChampBSSOSample',
    cert             : fs.readFileSync('./idp_cert.crt', 'utf-8'),
    privateCert      : fs.readFileSync('./my_key.key', 'utf-8'),
    identifierFormat : 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
  },
  function(profile, done) {
    done(null, profile);
  })
);

// Map passport user into our session (cookie).
// In this example, we ll store the entire user object in the session Store,
// Typically, you would only store the user_id (asserted by IDP) and 
// map this user_id to a User object in this service's database.
passport.serializeUser(function(user, done) {
  done(null, user);
  // done(null, user.LoginID);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // }
});

// plug in passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
//app.use('/login', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
