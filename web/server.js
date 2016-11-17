/**
 * Created by warrdnez on 28/07/16.
 */
var connect         = require('connect');
var serveStatic     = require('serve-static');
var directory       = 'http://gualdo.s3-website-us-west-2.amazonaws.com/web/app/dist/';
var http            = require('http');
var express                 = require("express");
var app                     = express();
var morgan                  = require("morgan");
var port                    = process.env.PORT || 8080;
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
app.get('/', function(req, res){
    var result = {
        data: [],
        error: null
    };
    res.status(200);
    res.jsonp(result);
    return "Hello world.";
});

app.use(router);
app = connect();
app.listen(port, function(){
    console.log('Listening on port: ' + port);
});