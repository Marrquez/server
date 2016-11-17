/**
 * Created by warrdnez on 28/07/16.
 */
var connect         = require('connect');
var http            = require('http');
var express                 = require("express");
var app                     = express();
var morgan                  = require("morgan");
var port                    = process.env.PORT || 80;
var bodyParser              = require("body-parser");
var methodOverride          = require("method-override");
var router                  = express.Router();
var CalibrationController   = require('./server/controllers/CalibrationController');

//para permitir parsear jsons
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//implementar y personalizar metodos http
app.use(methodOverride());
app.use(morgan("dev"));

app.get('/calibrate', CalibrationController.calibrate);
app.get('/', function(){
    return "Hello world";
});

app.use(router);
app = connect();

http.listen(port, function(){
    console.log('Listening on port: ' + port);
});