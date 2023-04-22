const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const utils = require("../utils");
const validateSchema = require("../schemaValidation");
const constants = require("../constants");

const checkOnSupport = (on_support, ErrorObj) => {
  let onSprtObj = ErrorObj;

  try {
    on_support = on_support.message;

    return ErrorObj
    //dao.setValue("onSprtObj", onSprtObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ONSUPPORT} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONSUPPORT} API`,
        err
      );
    }
  }
};

module.exports = checkOnSupport;
