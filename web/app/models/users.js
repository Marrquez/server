/**
 * Created by warrdnez on 31/07/16.
 */
var jQuery = require('jquery-deferred');
var constants = require('../utils/constants');

Users = function (dynamodb) {
    this.dynamodb = dynamodb;

    /**
     * Getting one user by
     * username: String
     * password: String
     * state == 1
     * */
    this.getDomainUser = function(docClient, uk){
        var defer = new jQuery.Deferred();
        var params = {
            TableName : constants.DYN_USERS_TABLE,
            FilterExpression: "#uk = :uk",
            ExpressionAttributeNames:{
                "#uk": "uk"
            },
            ExpressionAttributeValues: {
                ":uk": uk
            }
        };

        docClient.scan(params, function(err, data) {
            if (err || data.Items.length === 0) {
                defer.reject();
            } else {
                defer.resolve(data.Items[0]);
            }
        });

        return defer.promise();
    };
};

module.exports = Users;