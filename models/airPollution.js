var axios = require('axios');
const urlKey = require('../config/config');

module.exports = function(lat,lon){
    return axios.get(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${urlKey.getKey()}`)
    .then(res => {
        let totalPollution = 0;
        let pollutions = res.data.list;
        let doWearMask = "";
  
        for(let i=0;i<5;i++) {
          totalPollution= totalPollution+pollutions[i].components.pm2_5;
      }
      if(totalPollution/5 >= 10){
        doWearMask="Average pm2.5 >= "+10+", wear a mask";
      }
      else{
        doWearMask="Average pm2.5 < "+10;
      }
      return {"avrgPollution":(totalPollution/5).toFixed(2),"doWearMask":doWearMask};
    })


}