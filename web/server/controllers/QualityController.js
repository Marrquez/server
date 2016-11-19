/**
 * Calibrating the data
 * @param req
 * @param res
 */
exports.quality = function (req, res) {
    var form = JSON.parse(req.body.tmpl);
    var result = {
        data: {},
        error: null
    };

    if(form.length > 0){
        result.data.precision = "determinate the presicion";
    }else {
        result.data.precision = 0;
    }

    console.log("presicion: " + JSON.stringify(result.data));

    res.status(200);
    res.jsonp(result);
};

exports.getQuality = function (req, res) {
    var result = {
        data: {"test": "test... quality"}
    };

    res.status(200);
    res.jsonp(result);
};