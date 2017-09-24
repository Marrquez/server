/**
 * Calibrating the data
 * @param req
 * @param res
 */
var awsSingleton = require("../../app/awsconfig/config.js");
var aws = new awsSingleton();
var docClient = aws.docClient;
var dynamodb = aws.dynamodb;
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

exports.InsertUserData = function (req) {
    var idUser = req.query.idUser;
    var username = req.query.username;
    var points = req.query.points;
    console.log(points);
    console.log(idUser);
    console.log(username);
    jQuery.when(aws.DynamoUsers.InsertUserData(docClient,idUser, username, points)).done(function (resp) {
        console.log("Insert succeeded" );
    }).fail(function () {
        console.log("Insert Failed: ");
    });
};

exports.UpdateUserPoints = function (req) {
    var idUser = req.query.idUser;
    var points = req.query.points;
    console.log(points);
    console.log(idUser);
    jQuery.when(aws.DynamoUsers.UpdateUserPoints(dynamodb,idUser, points)).done(function (resp) {
        console.log("Update succeeded" );
    }).fail(function () {
        console.log("Update Failed: ");
    });
};



exports.getUserInfo = function (req, res) {
    var iUserId = req.query.idUser;
    console.log(iUserId);
    jQuery.when(aws.DynamoUsers.getUserInfo(docClient, iUserId)).done(function (resp) {
        res.status(200);
        res.jsonp({"data": resp});
    }).fail(function () {
        res.status(204);
        res.jsonp({"error": "mai_server_loggin_locked_user"});
    });
};


exports.InsertUserSSLog = function (req) {
    var idUser = req.query.idUser;
    var begin = req.query.dtBegin;
    var end = req.query.dtEnd;
    console.log(begin);
    console.log(idUser);
    console.log(end);
    jQuery.when(aws.DynamoUsers.InsertUserSSLog(docClient,idUser, begin, end)).done(function (resp) {
        console.log("Insert session log succeeded" );
    }).fail(function () {
        console.log("Insert session log Failed: ");
    });
};



