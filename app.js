// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
//var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var api = require('./routes/api.js');
var index = require('./routes/index.js');
//var mongoose = require('mongoose');
//var fs = require('fs');








// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//// uncomment after placing your favicon in /public
////app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static(__dirname + '/public'));





//app.use('/', index);
app.use('/api', api);

app.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

app.get('*', function (req, res) {
  res.sendFile("views/index.html", {"root": __dirname});
});


//app.use('/users', users);


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
