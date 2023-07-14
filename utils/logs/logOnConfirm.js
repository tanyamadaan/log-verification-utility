const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const utils = require("../utils");

const constants = require("../constants");

const checkOnConfirm = (data, msgIdSet) => {
    let on_confirm = data
    const onCnfrmObj = {};

    // try {
    //   console.log(
    //     `Comparing timestamp of /${constants.LOG_CONFIRM} and /${constants.LOG_ONCONFIRM}`
    //   );
    //   if (_.gte(dao.getValue("tmpstmp"), on_confirm.context.timestamp)) {
    //     onCnfrmObj.tmpstmpErr = `Timestamp for /${constants.LOG_CONFIRM} api cannot be greater than or equal to /${constants.LOG_ONCONFIRM} api`;
    //   }else {
    //     const timeDiff = utils.timeDiff(on_confirm.context.timestamp, dao.getValue("tmpstmp"));
    //     console.log(timeDiff);
    //     if (timeDiff > 1000) {
    //       onCnfrmObj.tmpstmp = `context/timestamp difference between /${constants.RET_ONCONFIRM} and /${constants.RET_CONFIRM} should be smaller than 1 sec`;
    //     }
    //   }

    //   dao.setValue("tmpstmp", on_confirm.context.timestamp);
    // } catch (error) {
    //   console.log(
    //     `Error while comparing timestamp for /${constants.LOG_CONFIRM} and /${constants.LOG_ONCONFIRM} api`,
    //     error
    //   );
    // }

    // try {
    //   console.log(
    //     `Comparing Message Ids of /${constants.LOG_CONFIRM} and /${constants.LOG_ONCONFIRM}`
    //   );
    //   if (!_.isEqual(dao.getValue("msgId"), on_confirm.context.message_id)) {
    //     onCnfrmObj.msgIdErr = `Message Ids for /${constants.LOG_CONFIRM} and /${constants.LOG_ONCONFIRM} apis should be same`;
    //   }
    //   msgIdSet.add(on_confirm.context.message_id);
    // } catch (error) {
    //   console.log(
    //     `Error while checking message id for /${constants.LOG_ONCONFIRM}`,
    //     error
    //   );
    // }

    on_confirm = on_confirm.message.order;
  
    try {
      console.log(
        `Comparing billing object in /${constants.LOG_INIT} and /${constants.LOG_ONCONFIRM}`
      );
      const billing = dao.getValue("billing");
      if (utils.isObjectEqual(billing, on_confirm.billing).length>0) {
        const billingMismatch= utils.isObjectEqual(billing, on_confirm.billing);
        onCnfrmObj.bill = `${billingMismatch.join(", ")} mismatches in /billing in /${constants.LOG_INIT} and /${constants.LOG_ONCONFIRM}`;
      }
    } catch (error) {
      console.log(
        `!!Error while comparing billing object in /${constants.LOG_INIT} and /${constants.LOG_ONCONFIRM}`
      );
    };
   return onCnfrmObj;
  };
module.exports = checkOnConfirm;
