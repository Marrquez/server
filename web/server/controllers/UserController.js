/**
 * Calibrating the data
 * @param req
 * @param res
 */
var awsSingleton = require("../../app/awsconfig/config.js");
var aws = new awsSingleton();
var docClient = aws.docClient;
var jQuery = require('jquery-deferred');

exports.user = function (req, res) {
    var result = {
        data: {},
        error: null
    };

    res.status(200);
    res.jsonp(result);
};

exports.getUser = function (req, res) {
    jQuery.when(aws.DynamoUsers.getLoggedUser(docClient, req.params.id)).done(function(resp){
        res.status(200);
        res.jsonp({"data": resp});
    }).fail(function(){
        res.status(204);
        res.jsonp({"error": "There were an error with the db conection"});
    });
};