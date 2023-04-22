const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const validateSchema = require("../schemaValidation");
const constants = require("../constants");

const checkOnTrack = (on_track, ErrorObj) => {
  let onTrckObj = ErrorObj;
  try {
    on_track = on_track.message.tracking;

    try {
      console.log(
        `Checking tracking URL when status is active (/${constants.RET_ONTRACK})`
      );
      if (on_track.status === "active" && !on_track.url) {
        onTrckObj.onTrackUrl =
          "Tracking url can't be null when status is active";
      }
    } catch (error) {
      console.log(
        `!!Error while checking tracking url in /${constants.RET_ONTRACK}`,
        error
      );
      // onTrckObj.onTrackUrl =
      //   "Tracking url can't be null in case status is active";
    }

    return ErrorObj
    //dao.setValue("onTrckObj", onTrckObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ONTRACK} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONTRACK} API`,
        err
      );
    }
  }
};

module.exports = checkOnTrack;
