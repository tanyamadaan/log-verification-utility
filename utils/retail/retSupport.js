const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");

const checkSupport = (support, ErrorObj) => {
  let sprtObj = ErrorObj;
  try {
    support = support.message;

    try {
      console.log(`Checking ref_id in /${constants.RET_SUPPORT}`);
      if (!_.isEqual(dao.getValue("txnId"), support.ref_id)) {
        sprtObj.refId = `Transaction Id should be provided as ref_id`;
      }
    } catch (error) {
      sprtObj.refId = `Transaction Id should be provided as ref_id`;
      console.log(
        `!!Error while checking ref_id in /${constants.RET_SUPPORT}`,
        error
      );
    }

    return ErrorObj
    //dao.setValue("sprtObj", sprtObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_SUPPORT} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_SUPPORT} API`,
        err
      );
    }
  }
};

module.exports = checkSupport;
