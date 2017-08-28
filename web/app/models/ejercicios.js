/**
 * Created by warrdnez on 31/07/16.
 */
var jQuery = require('jquery-deferred');
var constants = require('../utils/constants');

Ejercicio = function (dynamodb) {
    this.dynamodb = dynamodb;

    /**
     * Getting one user by
     * username: String
     * password: String
     * state == 1
     * */
    this.getEjercicio = function(docClient, id){
        var defer = new jQuery.Deferred();
        var params = {
            TableName : constants.DYN_EJERCICIOS_TABLE,
            FilterExpression: "#id = :id",
            ExpressionAttributeNames:{
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
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

module.exports = Ejercicio;