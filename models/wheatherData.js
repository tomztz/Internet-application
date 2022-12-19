var axios = require('axios');
const urlKey = require('../config/config');



module.exports = function(lat,lon){
    
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${urlKey.getKey()}&units=metric`)
    .then(res => {
      let wheatherInfo = [];
      var dateCount = 0;
      
      var temperature = 0;
      var windSpeed = 0;
      var rainLevel = 0;
      var timeCount =0;
      var doBringUnbrella = false;
      wheathers = res.data;
      var preDate = wheathers.list[0].dt_txt.split(" ")[0];
      for(wheather of wheathers.list) {
        
        if(dateCount==4){
            break;
        }
        if(wheather.dt_txt.split(" ")[0]!==preDate){
            preDate=wheather.dt_txt.split(" ")[0];
            dateCount++;
            let wheatherType = "";
            let reminder = "";
            let avrTemp = temperature/timeCount
            let avrWind = windSpeed/timeCount
            let avrRain = rainLevel/timeCount

            if(doBringUnbrella){
                reminder="RAIN,remember to bring an umbrella"
            }else{
                reminder="null";
            }
            if(avrTemp<12){
                wheatherType="COLD";
            }
            else if(avrTemp>12&&avrTemp<24){
                wheatherType="MILD"; 
            }
            else if(avrTemp>24){
                wheatherType="HOT";
            }
            let retData = {'Date':preDate, 'doBringUmbrella':reminder,'wheatherType':wheatherType,'avrTemp':avrTemp.toFixed(2),
            'windSpeed':avrWind.toFixed(2),'rainLevel':avrRain.toFixed(2)};
            wheatherInfo.push(retData)

            timeCount=0;
            temperature=0; 
            windSpeed=0;
            rainLevel=0;
            doBringUnbrella=false;
        }
        temperature = temperature+wheather.main.temp;
        windSpeed = windSpeed+wheather.wind.speed;
        
        if(wheather.rain!=undefined){
            doBringUnbrella=true;
            rainLevel = rainLevel+wheather.rain["3h"];
        }
        timeCount++;
    }
    return wheatherInfo
  })
  
  .catch(err => {
    console.log('Error: ', err.message);
  });



}