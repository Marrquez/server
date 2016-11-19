/**
 * Created by warrdnez on 28/07/16.
 */
var connect                 = require('connect');
var http                    = require('http');
var express                 = require("express");
var app                     = express();
var morgan                  = require("morgan");
var port                    = process.env.PORT || 8080;
var bodyParser              = require("body-parser");
var methodOverride          = require("method-override");
var router                  = express.Router();
var CalibrationController   = require('./server/controllers/CalibrationController');
var QualityController       = require('./server/controllers/QualityController');
var cors                    = require('cors');

// use it before all route definitions
//app.use(cors({origin: 'http://localhost:63342'}));
app.use(cors({origin: 'http://gualdo.s3-website-us-west-2.amazonaws.com'}));

//para permitir parsear jsons
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//implementar y personalizar metodos http
app.use(methodOverride());
app.use(morgan("dev"));

app.post('/quality', QualityController.quality);
app.get('/quality', QualityController.qualityG);

app.post('/calibrate', CalibrationController.calibrate);
app.get('/calibrate', CalibrationController.calibrateG);

app.get('/', function(req, res){
    var result = "Hi everyone!";
    res.status(200);
    res.jsonp(result);
});

app.use(router);
app.listen(port, function(){
    console.log('Listening on port: ' + port);
});