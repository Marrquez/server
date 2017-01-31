/**
 * Calibrating the data
 * @param req
 * @param res
 */
exports.quality = function (req, res) {
    var self = this;
    var form = JSON.parse(req.body.tmpl);
    self.qualities = [];
    var result = {
        data: {},
        error: null
    };

    self.calculateSUM = function(elements){
        var self = this;
        var sum = 0;
        var total = 0;

        var visiblesElements = elements.filter(function(element){
            return (element.render && element.render.properties.display === true) || (element.container && element.container.properties.display === true);
        });

        for(var i = 0; i < visiblesElements.length; i++){
            var element = visiblesElements[i];

            if(element.render){
                console.log(element.render);
                if(element.render.properties.value && element.render.properties.value.toString().toLowerCase() === element.render.properties.correct.toString().toLowerCase()){
                    sum += element.render.properties.weight;
                    total++;
                }
            }
        }

        return {"sum": sum, "corrects": total};
    };

    self.calculateAVG = function(elements){
        var self = this;
        var sum = 0;
        var total = 0;
        var corrects = 0;

        var visiblesElements = elements.filter(function(element){
            return (element.render && element.render.properties.display === true) || (element.container && element.container.properties.display === true);
        });

        for(var i = 0; i < visiblesElements.length; i++){
            var element = visiblesElements[i];

            if(element.render){
                console.log(element.render);
                if(element.render.properties.value && element.render.properties.value.toString().toLowerCase() === element.render.properties.correct.toString().toLowerCase()){
                    sum += element.render.properties.weight;
                    corrects++;
                }

                total++;
            }
        }

        return {"avg": sum/total, "corrects": corrects};
    };

    self.calculateADVAVG = function(){};

    self.calculateBOOL = function(){};

    self.calculate = function(elements){
        var self = this;

        for(var i = 0; i < elements.length; i++){
            var element = elements[i];

            if(element.container && element.container.properties.display){
                var calcResult = {
                    groupName: "",
                    operator: "",
                    result: {}
                };

                switch (element.container.properties.value){
                    case "sum":
                        calcResult.operator = "sum";
                        calcResult.groupName = element.container.properties.displayName;
                        calcResult.result = self.calculateSUM(element.container.elements);
                        self.qualities.push(calcResult);
                        break;

                    case "avg":
                        calcResult.operator = "avg";
                        calcResult.groupName = element.container.properties.displayName;
                        calcResult.result = self.calculateAVG(element.container.elements);
                        self.qualities.push(calcResult);
                        break;

                    case "advavg":
                        self.calculateADVAVG(element.container.elements);
                    break;

                    case "bool":
                        self.calculateBOOL(element.container.elements);
                    break;

                    default:
                    break;
                }
            }
        }
    };

    if(form.length > 0){
        self.calculate(form);
        result.data.quality = self.qualities;
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