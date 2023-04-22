const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const utils = require("../utils");
const validateSchema = require("../schemaValidation");
const constants = require("../constants");

const checkOnStatus = (on_status, ErrorObj) => {
  let onStatObj = ErrorObj;
  try {

    on_status = on_status.message.order;

    try {
      console.log(
        `Comparing order Id in /${constants.RET_ONCONFIRM} and /${constants.RET_ONSTATUS}`
      );
      if (on_status.id != dao.getValue("cnfrmOrdrId")) {
        console.log(
          `Order id (/${constants.RET_ONSTATUS}) mismatches with /${constants.RET_CONFIRM})`
        );
        onStatObj.onStatusOdrId = `Order id in /${constants.RET_CONFIRM} and /${constants.RET_ONSTATUS} do not match`;
      }
    } catch (error) {
      console.log(
        `!!Error while comparing order id in /${constants.RET_ONSTATUS} and /${constants.RET_CONFIRM}`,
        error
      );
      // onStatObj.onStatusOrdrId =
      //   "Order id mismatches in /${constants.RET_ONCONFIRM} and /${constants.RET_ONSTATUS}";
    }
    try {
      console.log(`Checking order state in /${constants.RET_ONSTATUS}`);
      if (!utils.retailOrderState.includes(on_status.state)) {
        onStatObj.ordrSt = `Order State in /${constants.RET_ONSTATUS} is not as per the API Contract`;
      }
    } catch (error) {
      // onStatObj.ordrSt = `Order State (/${constants.RET_ONSTATUS}) should be as per the API Contract`;
      console.log(
        `!!Error while checking order state in /${constants.RET_ONSTATUS}`,
        error
      );
    }

    try {
      console.log(
        `Checking provider id and location in /${constants.RET_ONSTATUS}`
      );
      if (on_status.provider.id != dao.getValue("providerId")) {
        onStatObj.prvdrId = `Provider Id mismatches in /${constants.RET_ONSEARCH} and /${constants.RET_ONSTATUS}`;
      }

      if (on_status.provider.locations[0].id != dao.getValue("providerLoc")) {
        onStatObj.prvdrLoc = `provider.locations[0].id mismatches in /${constants.RET_ONSEARCH} and /${constants.RET_ONSTATUS}`;
      }
    } catch (error) {
      console.log(
        `!!Error while checking provider id and location in /${constants.RET_ONSTATUS}`,
        error
      );
    }

    try {
      console.log("Checking Fulfillments state");
      on_status.fulfillments.forEach((element) => {
        console.log(`Checking fulfillment state for Id ${element.id}`);
        if (
          !utils.retailFulfillmentState.includes(element.state.descriptor.code)
        ) {
          onStatObj.ffStatusState = `Fulfillment State Code in /${constants.RET_ONSTATUS} is not as per the API Contract`;
        }
      });
    } catch (error) {
      console.log(
        `Fulfillment state Code (/${constants.RET_ONSTATUS}) should be as per the API Contract.`,
        error
      );
    }

    return ErrorObj
    //dao.setValue("onStatObj", onStatObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_ONSTATUS} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_ONSTATUS} API`,
        err
      );
    }
  }
};

module.exports = checkOnStatus;
