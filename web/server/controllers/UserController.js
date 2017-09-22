/**
 * Calibrating the data
 * @param req
 * @param res
 */
var awsSingleton = require("../../app/awsconfig/config.js");
var aws = new awsSingleton();
var docClient = aws.docClient;
var jQuery = require('jquery-deferred');

exports.getUser = function (req, res) {
    var id = req.query.id;
    jQuery.when(aws.DynamoUsers.getDomainUser(docClient, id)).done(function(resp){
        res.status(200);
        res.jsonp({"data": resp});
    }).fail(function(){
        res.status(204);
        res.jsonp({"error": "mai_server_loggin_locked_user"});
    });
};

exports.updateUserPoints = function (req, res, res) {
    var points = req.query.points;
    var iUserId = req.query.idUser;
    console.log(points);
    console.log(iUserId);
    jQuery.when(aws.DynamoEjercicios.updateUserPoints(docClient,iUserId, points)).done(function(resp){
        res.status(200);
        res.jsonp({"data": resp});
    }).fail(function(){
        res.status(204);
        res.jsonp({"error": "mai_server_loggin_locked_user"});
    });
};