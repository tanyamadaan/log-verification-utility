/**
 * 
 * @param {string} lat The Latitude Coordinate upto 6 decimal place
 * @param {string } long The Longgitude Coordinate upto 6 decimal place
 * @param {string} area_code The Area Code to check the above lat-long pair against
 * @returns {boolean} Returns `true` if `area_code` matched lat-long pair
 */
const reverseGeoCodingCheck = async (lat, long, area_code) => {
  var fetch = require("node-fetch");
  var requestOptions = {
    method: "GET",
  };
  try {
    const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${process.env.GEOAPIFY_API_KEY}`, requestOptions);
    const response = await res.json();
    return response.features[0].properties.postcode === area_code
  } catch (error) {
    console.log(error);
  }
};

module.exports = { reverseGeoCodingCheck };
