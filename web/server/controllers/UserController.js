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

exports.InsertUserData = function (req, res) {
    var idUser = req.body.idUser;
    var username = req.body.username;
    var points = req.body.points;
    console.log(points);
    console.log(idUser);
    console.log(username);
    jQuery.when(aws.DynamoUsers.InsertUserData(docClient,idUser, username, points)).done(function (resp) {
        res.status(200);
        res.jsonp({"data": resp});
        console.log("Insert succeeded" );
    }).fail(function () {
        res.status(204);
        res.jsonp({"error": "mai_server_Insert_user"});
        console.log("Insert Failed: ");
    });
};

exports.UpdateUserPoints = function (req, res) {
    var idUser = req.body.idUser;
    var points = req.body.points;
    var dtBegin = req.body.dtBegin;
    var dtEnd = req.body.dtEnd;
    console.log(points);
    console.log(idUser);
    console.log(dtBegin);
    console.log(dtEnd);
    //inserta los puntos del usuario
    jQuery.when(aws.DynamoUsers.UpdateUserPoints(dynamodb, docClient, idUser, points,dtBegin,dtEnd)).done(function (resp) {
        res.status(200);
        res.jsonp({"data": resp});
        console.log("Update succeeded" );
    }).fail(function () {
        res.status(204);
        res.jsonp({"error": "mai_server_update_point"});
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


exports.InsertUserSSLog = function (req, res) {
    var idUser = req.body.idUser;
    var begin = req.body.dtBegin;
    var end = req.body.dtEnd;
    console.log(begin);
    console.log(idUser);
    console.log(end);
    jQuery.when(aws.DynamoUsers.InsertUserSSLog(docClient,idUser, begin, end)).done(function (resp) {
        res.status(200);
        res.jsonp({"data": resp});
        console.log("Insert session log succeeded" );
    }).fail(function () {
        res.status(204);
        res.jsonp({"error": "mai_server_insert_session_user"});
        console.log("Insert session log Failed: ");
    });
};







