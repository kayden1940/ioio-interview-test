const https = require('https')

const fetchWeather=()=> {
  const url = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&amp;lang=en';

  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });
  });
};


exports.handler = async (event) => {
    
    let result = await fetchWeather();
    
    if(result && result?.weatherForecast){
       result = result.weatherForecast.reduce((result,weather)=>{
           const {forecastDate,forecastWeather}= weather
           result.push({
               forecastDate,
               forecastWeather
           })
           return result
       },[])
    }
    
    const response = {
        statusCode: 200,
        body: result
    };
    return response;
};
