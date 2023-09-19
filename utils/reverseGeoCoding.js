const reverseGeoCodingCheck = async (long, lat, area_code) => {
    console.log("Starting RGC")
    var fetch = require('node-fetch');
    var requestOptions = {
      method: 'GET',
    };
    
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${process.env.GEOAPIFY_API_KEY}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log("Result from GEOAPIFY is",result))
      .catch(error => console.log('error', error));
}

module.exports = {reverseGeoCodingCheck}