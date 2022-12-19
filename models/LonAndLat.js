var axios = require('axios');
const urlKey = require('../config/config')


module.exports = function(city){
    
    return axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${urlKey.getKey()}`)
    .then(res => {

      cities = res.data;

      for(city of cities) {
        return {'lat':city.lat,'lon':city.lon};
    }
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });

}