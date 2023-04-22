const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkStatus = (status, ErrorObj) => {
  let statObj = ErrorObj;
  try {

    status = status.message;

    try {
      console.log(
        `Comparing order id for /${constants.RET_CONFIRM} and /${constants.RET_STATUS}`
      );
      if (dao.getValue("cnfrmOrdrId") != status.order_id) {
        statObj.orderId = `Order ids in /${constants.RET_CONFIRM} and /${constants.RET_STATUS} do not match`;
      }
    } catch (error) {
      console.log(
        `!!Error occurred while comparing order ids /confirm and /${constants.RET_STATUS}`,
        error
      );
    }

    return ErrorObj
    //dao.setValue("statObj", statObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_STATUS} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_STATUS} API`,
        err
      );
    }
  }
};

module.exports = checkStatus;
