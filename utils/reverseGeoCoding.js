/**
 *
 * @param {string} lat The Latitude Coordinate upto 6 decimal place
 * @param {string } long The Longgitude Coordinate upto 6 decimal place
 * @param {string} area_code The Area Code to check the above lat-long pair against
 * @returns {boolean} Returns `true` if `area_code` matched lat-long pair
 */
const reverseGeoCodingCheck = async (lat, long, area_code) => {
  var c = 0;
  var fetch = require("node-fetch");
  var requestOptions = {
    method: "GET",
  };
  if (process.env.GEOAPIFY_API_KEY) {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${process.env.GEOAPIFY_API_KEY}`,
        requestOptions
      );
      const response = await res.json();
      if (response.features[0].properties.postcode === area_code) c++;
    } catch (error) {
      console.log(error);
    }
  }

  if (process.env.MAPPLS_API_KEY) {
    try {
      const res = await fetch(
        `https://apis.mappls.com/advancedmaps/v1/${process.env.MAPPLS_API_KEY}/rev_geocode?lat=${lat}&lng=${long}&region=IND&lang=en`,
        requestOptions
      );
      const response = await res.json();
      if (response.results[0].pincode === area_code) c++;
    } catch (error) {
      console.log(error);
    }
  }
  return c > 1;
};

module.exports = { reverseGeoCodingCheck };
