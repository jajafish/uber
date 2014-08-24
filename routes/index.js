var request             = require('request');
var rides               = [];


exports.cabComing = function(req, res){

    request({        
        uri: "https://api.uber.com/v1/estimates/time?server_token=C5R27sKNhJWMkEzxpP4aYGlg7Tlul1ztxp0OluON&start_latitude=37.7759792&start_longitude=-122.41823",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function(err, response, body){

        var answer = JSON.parse(body);
        var times = answer.times;

        for (var i=0; i<times.length; i++){
            var rideName = times[i].localized_display_name;
            var estimateTime = times[i].estimate;

            var minutes = Math.floor(estimateTime / 60);

            var rideOptionObject = {
                ride: rideName,
                wait: minutes
            };
            rides.push(rideOptionObject);
        }

        // var ridesForPage = JSON.stringify(rides);

        res.render('cabComing', {
            title: "Cab Coming!",
            ride: rides[0]
            }
        );

    });

};


