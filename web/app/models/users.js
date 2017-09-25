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
    // Metodo que inserta los datos de un usuario
    //</summary>
    //<remarks>
    //     <para><version>1.0.000</version><cambio>Creado</cambio><fecha>2017/09/21</fecha></para>
    //</remarks>
    //<param name="docClient">Identifica la conexion a la base de datos
    //<param name="idUser">identificador del usuario</param>
    //<param name="Username">Nombre del usuario</param>
    //<param name="Points">puntaje a asignarle al usuario</param>
    //<history>
    // Nestor Cepeda - 2017/09/21
    //</history>
    this.InsertUserData = function (docClient, idUser, Username, Points){
        var defer = new jQuery.Deferred();

        var params = {
            TableName : constants.DYN_USER_TABLE,
            Key:{"iUserId": {"S":idUser},
                "vchUsername": {"S":Username},
                "iPoints": {"N":Points}
            },
            Item:{
                'iUserId': idUser,
                'vchUsername': Username,
                'iPoints': Points

            }
        };

        docClient.put(params, function(err, data) {
            if (err ) {
                defer.reject();
                console.log("Unable to insert item. Error: ", JSON.stringify(err, null, 2));
            } else {
                defer.resolve();
                console.log("Inserted item succeeded: ", JSON.stringify(data, null, 2));
            }
        });

        return defer.promise();
    };
    //**************************************
    //<summary>
    // Metodo que consulta la ingformacion del usuario por medio del id de usuari
    //</summary>
    //<remarks>
    //     <para><version>1.0.000</version><cambio>Creado</cambio><fecha>2017/09/23</fecha></para>
    //</remarks>
    //<param name="docClient">Identifica la conexion a la base de datos
    //<param name="idUser">Identifica el identificador del usuario</param>
    //<history>
    // Nestor Cepeda - 2017/09/21
    //</history>
    this.getUserInfo = function(docClient, idUser){
        var defer = new jQuery.Deferred();

        var params = {

            ProjectionExpression: ["iUserId","vchUsername","iPoints"],
            ExpressionAttributeNames:{
                "#iUserId": "iUserId"
            },
            ExpressionAttributeValues: {
                ":iUserId": idUser
            },
            FilterExpression: "#iUserId = :iUserId",
            TableName: constants.DYN_USER_TABLE
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
    // Metodo que actualiza los puntos de un usuario
    //</summary>
    //<remarks>
    //     <para><version>1.0.000</version><cambio>Creado</cambio><fecha>2017/09/23</fecha></para>
    //</remarks>
    //<param name="docClient">Identifica la conexion a la base de datos
    //<param name="idUser">identificador del usuario</param>
    //<param name="Points">puntaje a asignarle al usuario</param>
    //<history>
    // Nestor Cepeda - 2017/09/23
    //</history>
    this.UpdateUserPoints = function (docClient, idUser, Points){
        var defer = new jQuery.Deferred();

        var params = {
            TableName : constants.DYN_USER_TABLE,
            Key:{"iUserId": {"S":idUser}},
            UpdateExpression:"SET iPoints = :ipts",
            ExpressionAttributeValues:{":ipts": {"N":Points}},
            ReturnValues: "UPDATED_NEW"
        };

        docClient.updateItem(params, function(err, data) {
            if (err ) {
                defer.reject();
                console.log("Unable to update item. Error: ", JSON.stringify(err, null, 2));
            } else {
                defer.resolve();
                console.log("Updated item succeeded: ", JSON.stringify(data, null, 2));
            }
        });

        return defer.promise();
    };
    //<summary>
    // Metodo que inserta el log de la sesiones de un usuario
    //</summary>
    //<remarks>
    //     <para><version>1.0.000</version><cambio>Creado</cambio><fecha>2017/09/23</fecha></para>
    //</remarks>
    //<param name="docClient">Identifica la conexion a la base de datos
    //<param name="idUser">identificador del usuario</param>
    //<param name="begin">fecha de inicio de la sesion</param>
    //<param name="end">fecha de fin de la sesion</param>
    //<history>
    // Nestor Cepeda - 2017/09/23
    //</history>
    this.InsertUserSSLog = function (docClient, idUser, dBegin, dEnd){
        var defer = new jQuery.Deferred();
        var uuid = require('uuid');
        uuid.v1();

        var params = {
            TableName : constants.DYN_USERSESSIONLOG_TABLE,
            Item:{
                "iUserSessionLog": uuid.v1(),
                "iUserId": idUser,
                'dtSessionBegin': dBegin,
                'dtSessionEnd': dEnd

            }
        };

        docClient.put(params, function(err, data) {
            if (err ) {
                defer.reject();
                console.log("Unable to insert item. Error: ", JSON.stringify(err, null, 2));
            } else {
                defer.resolve();
                console.log("Inserted item succeeded: ", JSON.stringify(data, null, 2));
            }
        });

        return defer.promise();
    };

};

module.exports = Users;