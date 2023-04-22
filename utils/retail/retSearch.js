const dao = require("../../dao/dao");
const fs = require("fs");
const utils = require("../utils");
const constants = require("../constants");
const { checkContext } = require("../../services/service");
const validateSchema = require("../schemaValidation");

const checkSearch = (search, ErrorObj) => {
  let srchObj = ErrorObj;
  try {
    try {
      console.log("Checking GPS Precision in /search");
      if (search.hasOwnProperty("item")) {
        if (search.hasOwnProperty("fulfillment")) {
          const gps = search.fulfillment.end.location.gps.split(",");
          const gpsLat = gps[0];
          const gpsLong = gps[1];

          if (!gpsLat || !gpsLong) {
            srchObj.gpsErr = `location.gps is not as per the API contract`;
          }
        } else {
          srchObj.flfllmntObj = `Fulfillment object missing in /${search.context.action} API`;
        }
      }
    } catch (error) {
      console.log("!!Error while checking GPS Precision", error);
    }

    return ErrorObj
    //dao.setValue("srchObj", srchObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${search.context.action} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${search.context.action} API`,
        err
      );
    }
  }
};

module.exports = checkSearch;
