const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");

const checkTrack = (track, ErrorObj) => {
  let trckObj = ErrorObj;
  try {
    track = track.message;

    try {
      console.log(
        `Checking Order Id in /${constants.RET_TRACK} and /${constants.RET_CONFIRM}`
      );
      if (track.order_id != dao.getValue("cnfrmOrdrId")) {
        console.log(
          `Order Id in /${constants.RET_TRACK} and /${constants.RET_CONFIRM} do not match`
        );
        trckObj.trackOrdrId = `Order Id in /${constants.RET_TRACK} and /${constants.RET_CONFIRM} do not match`;
      }
    } catch (error) {
      console.log(
        `Error while comparing order id in /${constants.RET_TRACK} and /${constants.RET_CONFIRM}`,
        error
      );
      // trckObj.trackOrdrId = "Order Id in /${constants.RET_TRACK} and /${constants.RET_ONCONFIRM} do not match";
    }
    return ErrorObj
    //dao.setValue("trckObj", trckObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_TRACK} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_TRACK} API`,
        err
      );
    }
  }
};

module.exports = checkTrack;
