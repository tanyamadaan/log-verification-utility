const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require ("../utils.js");

const checkConfirm = (data, msgIdSet) => {
 
  let cnfrmObj = {};
  let confirm = data;

    // try {
    //   console.log(
    //     `Comparing timestamp of /${constants.LOG_ONINIT} and /${constants.LOG_CONFIRM}`
    //   );
    //   if (_.gte(dao.getValue("tmpstmp"), confirm.context.timestamp)) {
    //     cnfrmObj.tmpstmpErr = `Timestamp for /${constants.LOG_ONINIT} api cannot be greater than or equal to /${constants.LOG_CONFIRM} api`;
    //   }
    //   dao.setValue("tmpstmp", confirm.context.timestamp);
    // } catch (error) {
    //   console.log(
    //     `!!Error while comparing timestamp for /${constants.LOG_ONINIT} and /${constants.LOG_CONFIRM} api`,
    //     error
    //   );
    // }


    // try {
    //   console.log(`Checking Message Id of /${constants.LOG_CONFIRM}`);

    //   if (msgIdSet.has(confirm.context.message_id)) {
    //     cnfrmObj.msgId2Err =
    //     `Message Id for ${constants.LOG_CONFIRM} is not unique`;
    //   }
    //   dao.setValue("msgId", confirm.context.message_id);
    // } catch (error) {
    //   console.log(
    //     `!!Error while checking message id for /${constants.LOG_CONFIRM}`,
    //     error
    //   );
    // }

    confirm = confirm.message.order;
    const cnfrmOrdrId = confirm.id;
    dao.setValue("cnfrmOrdrId", cnfrmOrdrId);

    try {
      console.log(
        `Comparing billing object in /${constants.LOG_INIT} and /${constants.LOG_CONFIRM}`
      );
      const billing = dao.getValue("billing");
      if (utils.isObjectEqual(billing, confirm.billing).length>0) {
        const billingMismatch= utils.isObjectEqual(billing, confirm.billing);
        cnfrmObj.bill = `${billingMismatch.join(", ")} mismatches in /billing in /${constants.LOG_INIT} and /${constants.LOG_CONFIRM}`;
      }
      // dao.setValue("billing", confirm.billing);
    } catch (error) {
      console.log(
        `!!Error while comparing billing object in /${constants.LOG_INIT} and /${constants.LOG_CONFIRM}`
      );
    }

    try {
      console.log(`storing payment object in /${constants.LOG_CONFIRM}`);
      dao.setValue("cnfrmpymnt", confirm.payment);
    } catch (error) {
      console.log(
        `!!Error while storing payment object in /${constants.LOG_CONFIRM}`,
        error
      );
    }

    return cnfrmObj;
};

module.exports = checkConfirm;
