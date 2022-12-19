var axios = require('axios');
const urlKey = require('../config/config');



module.exports = function(lat,lon,time){
    
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${urlKey.getKey()}&units=metric`)
    .then(res => {
      let wheatherInfo = [];
      
      var doBringUnbrella = false;
      wheathers = res.data;
      var count = 0;
      let rainLevel = 0;
      for(wheather of wheathers.list) {
        
        if(count==4){
            break;
        }
        if(wheather.dt_txt.split(" ")[1]===time){
            if(wheather.rain!=undefined){
                doBringUnbrella=true;
                rainLevel = rainLevel+wheather.rain["3h"];
            }
            
            let wheatherType = "";
            let reminder = "";

            if(doBringUnbrella){
                reminder="RAIN,remember to bring an umbrella"
            }else{
                reminder="null";
            }
            if(wheather.main.temp<12){
                wheatherType="COLD";
            }
            else if(wheather.main.temp>12&&wheather.main.temp<24){
                wheatherType="MILD"; 
            }
            else if(wheather.main.temp>24){
                wheatherType="HOT";
            }
            let retData = {'Date':wheather.dt_txt, 'doBringUmbrella':reminder,'wheatherType':wheatherType,'avrTemp':wheather.main.temp.toFixed(2),
            'windSpeed':wheather.wind.speed.toFixed(2),'rainLevel':rainLevel.toFixed(2)};
            wheatherInfo.push(retData)

            
            doBringUnbrella=false;
            count++;

        }
        
        
    }
    return wheatherInfo
  })
  
  .catch(err => {
    console.log('Error: ', err.message);
  });



}