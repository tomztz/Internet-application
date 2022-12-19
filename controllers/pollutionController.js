var getLonAndLat = require('../models/LonAndLat');
var getAirPollution = require('../models/airPollution');
var cors = require('cors')

module.exports = function(app){
    app.use(cors())

    app.get('/pollution/:city', function(req, res) {
        getLonAndLat(req.params.city).then(response => {
            lat = response.lat;
            lon = response.lon;
            getAirPollution(lat,lon).then(response => {
             res.send(response);
           });
            
         });
        
         
     });



}