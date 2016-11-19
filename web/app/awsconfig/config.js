var AWS = require('aws-sdk');
var constants = require('../utils/constants');
AWS.config.update({accessKeyId: constants.AK, secretAccessKey: constants.SAK});
AWS.config.region = "us-west-2";

var dynamoUsers = require('../models/users.js');
var dynamoCatalogs = require('../models/catalogs.js');

function AwsWrapper () {
    this.dynamodb = new AWS.DynamoDB();
    this.docClient = new AWS.DynamoDB.DocumentClient();
    this.DynamoUsers = new dynamoUsers(this.dynamodb);
    this.DynamoCatalogs = new dynamoCatalogs(this.dynamodb);
};

module.exports = AwsWrapper;