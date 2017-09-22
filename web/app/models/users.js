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
    //<summary>
    // Metodo que actializa los puntos asignados a un usuario
    //</summary>
    //<remarks>
    //     <para><version>1.0.000</version><cambio>Creado</cambio><fecha>2017/09/21</fecha></para>
    //</remarks>
    //<param name="docClient">Identifica la conexion a la base de datos
    //<param name="idUser">Identifica el identificador del usuario</param>
    //<param name="iPoints">Identifica el puntaje a asignarle al usuario</param>
    //<history>
    // Nestor Cepeda - 2017/09/21
    //</history>
    this.updateUserPoints = function(docClient, idUser, Points){
        var defer = new jQuery.Deferred();

        var params = {
            TableName : constants.DYN_USER_TABLE,
            ExpressionAttributeNames:{
                "#iPoints": "Points"
            },
            ExpressionAttributeValues: {
                "iPts": Points
            },
            Key:{
                "#iUserId": "idUser"
            },
            UpdateExpression: "SET #iPoints : iPts"
        };

        docClient.updateItem(params, function(err, data) {
            if (err || data.Items.length === 0) {
                defer.reject();
            } else {
                defer.resolve(data.Items[0]);
            }
        });

        return defer.promise();
    };
    //**************************************
};

module.exports = Users;