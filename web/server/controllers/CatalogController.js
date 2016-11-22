/**
 * Calibrating the data
 * @param req
 * @param res
 */
var awsSingleton = require("../../app/awsconfig/config.js");
var aws = new awsSingleton();
var docClient = aws.docClient;
var jQuery = require('jquery-deferred');

exports.getCatalogs = function (req, res) {
    var filters = JSON.parse(req.params.params);

    if(filters.ui !== ""){
        jQuery.when(aws.DynamoCatalogs.getCatalogsOfUser(docClient, filters.ui, filters.ct)).done(function(resp){
            res.status(200);
            res.jsonp({"data": resp});
        }).fail(function(){
            res.status(204);
            res.jsonp({"error": "mai_server_catalogs_ui"});
        });
    }else if(filters.ci !== ""){
        jQuery.when(aws.DynamoCatalogs.getCatalog(docClient, filters.ci)).done(function(resp){
            res.status(200);
            res.jsonp({"data": resp});
        }).fail(function(){
            res.status(204);
            res.jsonp({"error": "mai_server_catalogs_ci"});
        });
    }else{
        jQuery.when(aws.DynamoCatalogs.getCatalogs(docClient)).done(function(resp){
            res.status(200);
            res.jsonp({"data": resp});
        }).fail(function(){
            res.status(204);
            res.jsonp({"error": "mai_server_catalogs_all"});
        });
    }
};

exports.deleteCatalog = function (req, res) {
    var filters = JSON.parse(req.params.params);

    jQuery.when(aws.DynamoCatalogs.deleteCatalog(docClient, filters.ci)).done(function(resp){
        res.status(200);
        res.jsonp({"data": resp});
    }).fail(function(){
        res.status(204);
        res.jsonp({"error": "mai_server_catalogs_ci"});
    });
};

exports.createCatalog = function (req, res) {
    jQuery.when(aws.DynamoCatalogs.createNewCatalog(docClient, req.body.c)).done(function(resp){
        res.status(200);
        res.jsonp({"data": resp});
    }).fail(function(){
        res.status(204);
        res.jsonp({"error": "mai_server_catalogs_ci"});
    });
};

exports.updateCatalog = function (req, res) {
    jQuery.when(aws.DynamoCatalogs.updateCatalog(docClient, req.body.c)).done(function(resp){
        res.status(200);
        res.jsonp({"data": resp});
    }).fail(function(){
        res.status(204);
        res.jsonp({"error": "mai_server_catalogs_ci"});
    });
};