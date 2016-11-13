/**
 * Calibrating the data
 * @param req
 * @param res
 */
exports.calibrate = function (req, res) {
	var result = {
		data: [],
		error: null
	};

	res.status(200);
	console.log("hiiiii!!! --- :)");
	res.jsonp(result);
};