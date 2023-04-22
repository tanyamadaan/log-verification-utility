const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkOnCancel = (on_cancel, ErrorObj) => {
  let onCnclObj = ErrorObj;

  try {
    on_cancel = on_cancel.message.order;

    try {
      console.log(
        `Comparing order id in /${constants.RET_ONCANCEL} and /${constants.RET_CONFIRM}`
      );
      if (on_cancel.id != dao.getValue("cnfrmOrdrId")) {
        onCnclObj.onCancelId = `Order id in /${constants.RET_ONCANCEL} and /${constants.RET_CONFIRM} do not match`;
        console.log(
          `Order id in /${constants.RET_ONCANCEL} and /${constants.RET_CONFIRM} do not match`
        );
      }
    } catch (error) {
      // onCnclObj.onCancelId =
      //   "Order id in /${constants.RET_ONCANCEL} and /${constants.RET_ONCONFIRM} do not match";
      console.log(
        `!!Error while comparing order id in /${constants.RET_ONCANCEL} and /${constants.RET_ONCONFIRM}`,
        error
      );
    }

    try {
      console.log(
        `Comparing cancellation reason id in /${constants.RET_ONCANCEL} and /${constants.RET_CANCEL}`
      );
      if (dao.getValue("cnclRid") != on_cancel.tags.cancellation_reason_id) {
        onCnclObj.onCancelRID = `Cancellation Reason Id in /${constants.RET_CANCEL} and /${constants.RET_ONCANCEL} should be same`;
      }
    } catch (error) {
      console.log(
        `!!Error while comparing cancellation reason id in /${constants.RET_CANCEL} and /${constants.RET_ONCANCEL}`,
        error
      );
      // onCnclObj.onCancelRID =
      //   "Cancellation reason Id in /${constants.RET_CANCEL} and /${constants.RET_ONCANCEL} (inside tags) should be same";
    }
    return ErrorObj
    //dao.setValue("onCnclObj", onCnclObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ONCANCEL} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONCANCEL} API`,
        err
      );
    }
  }
};

module.exports = checkOnCancel;
