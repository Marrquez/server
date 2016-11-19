/**
 * Calibrating the data
 * @param req
 * @param res
 */
var awsSingleton = require("../../app/awsconfig/config.js");
this.aws = new awsSingleton();
this.docClient = this.aws.docClient;

exports.catalog = function (req, res) {
    var result = {
        data: {},
        error: null
    };

    res.status(200);
    res.jsonp(result);
};

exports.getCatalog = function (req, res) {
    var result = {
        data: {"test": "test... catalog"}
    };

    res.status(200);
    res.jsonp(result);
};