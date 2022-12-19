var getWheather = require('../models/wheatherData');
var getLonAndLat = require('../models/LonAndLat');
var getWheatherAtTime = require('../models/wheatherDataAtTime');
var cors = require('cors')

module.exports = function(app){
    app.use(cors())

    app.get('/wheather/:city', function(req, res) {
        getLonAndLat(req.params.city).then(response => {
            lat = response.lat;
            lon = response.lon;
            getWheather(lat,lon).then(response => {
             res.send(response);
           });
            
         });
        
         
     });
     app.get('/wheather/:city/:time', function(req, res) {
      getLonAndLat(req.params.city).then(response => {
          lat = response.lat;
          lon = response.lon;
          getWheatherAtTime(lat,lon,req.params.time).then(response => {
           res.send(response);
         });
          
       });
      
       
   });


}