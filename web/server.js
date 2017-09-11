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
//var CalibrationController   = require('./server/controllers/CalibrationController');
//var QualityController       = require('./server/controllers/QualityController');
//var CatalogController       = require('./server/controllers/CatalogController');
//var UserController          = require('./server/controllers/UserController');
var EjercicioController          = require('./server/controllers/EjercicioController');
var cors                    = require('cors');

// in order to fix: No 'Access-Control-Allow-Origin'
/*app.use(cors({origin: 'io.ionic.starter'}));*/
//app.use(cors({origin: 'http://kiinitro.s3-website-us-west-2.amazonaws.com'}));

//para permitir parsear jsons
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//implementar y personalizar metodos http
app.use(methodOverride());
app.use(morgan("dev"));

app.get('/getEjercicio', EjercicioController.getEjercicio);
app.get('/getEjercicesByMuscle', EjercicioController.getEjercicesByMuscle);
app.get('/getEjercicioById', EjercicioController.getEjerciciobyId);


/*app.post('/quality/:params', QualityController.quality);
app.get('/quality', QualityController.getQuality);
app.post('/catalog/:params', CatalogController.createCatalog);
app.put('/catalog/:params', CatalogController.updateCatalog);
app.delete('/catalog/:params', CatalogController.deleteCatalog);
app.get('/catalog/:params', CatalogController.getCatalogs);
app.get('/user/:id', UserController.getUser);
app.post('/calibrate', CalibrationController.calibrate);
app.get('/calibrate', CalibrationController.getCalibration);*/

app.get('/', function(req, res){
    var result = "Hi everyone!";
    res.status(200);
    res.jsonp(result);
});

app.use(router);
app.listen(port, function(){
    console.log('Listening on port: ' + port);
});
