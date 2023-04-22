const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const utils = require("../utils");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkCancel = (cancel, ErrorObj) => {
  let cnclObj = ErrorObj;
  try {

    cancel = cancel.message;

    try {
      console.log(
        `Comparing order Id in /${constants.RET_CANCEL} and /${constants.RET_CONFIRM}`
      );
      if (cancel.order_id != dao.getValue("cnfrmOrdrId")) {
        cnclObj.cancelOrdrId = `Order Id in /${constants.RET_CANCEL} and /${constants.RET_CONFIRM} do not match`;
        console.log(
          `Order Id mismatch in /${constants.RET_CANCEL} and /${constants.RET_CONFIRM}`
        );
      }
    } catch (error) {
      console.log(
        `Error while comparing order id in /${constants.RET_CANCEL} and /${constants.RET_CONFIRM}`,
        error
      );
      // cnclObj.cancelOrdrId =
      //   "Order Id in /${constants.RET_CANCEL} and /${constants.RET_ONCONFIRM} do not match";
    }

    try {
      console.log("Checking the validity of cancellation reason id");
      if (!(cancel.cancellation_reason_id in utils.cancellation_rid)) {
        console.log(
          `Cancellation Reason Id in /${constants.RET_CANCEL} is not a valid reason id`
        );

        cnclObj.cancelRid = `Cancellation reason id in /${constants.RET_CANCEL} is not a valid reason id`;
      } else dao.setValue("cnclRid", cancel.cancellation_reason_id);
    } catch (error) {
      // cnclObj.cancelRid =
      //   "Cancellation reason id in /${constants.RET_CANCEL} is not a valid reason id";
      console.log(
        `Error while checking validity of cancellation reason id /${constants.RET_CANCEL}`,
        error
      );
    }
    return ErrorObj
    //dao.setValue("cnclObj", cnclObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_CANCEL} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_CANCEL} API`,
        err
      );
    }
  }
};

module.exports = checkCancel;
