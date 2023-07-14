const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils");

const checkInit = (data,msgIdSet) => {

    const initObj = {};
    let init =data
    const contextTime = init.context.timestamp
    // try {
    //   console.log(
    //     `Comparing timestamp of /${constants.LOG_ONSEARCH} and /${constants.LOG_INIT}`
    //   );
    //   console.log(dao.getValue("tmpstmp"),contextTime)
    //   if (_.gte(dao.getValue("tmpstmp"), contextTime)) {
    //     initObj.tmpstmpErr = `Timestamp for  /${constants.LOG_ONSEARCH} api cannot be greater than or equal to /${constants.LOG_INIT} api`;
    //   }
    //   dao.setValue("tmpstmp", contextTime);
    // } catch (error) {
    //   console.log(
    //     `!!Error while comparing timestamp for /${constants.LOG_ONSEARCH} and /${constants.LOG_INIT} api`,
    //     error
    //   );
    // }

    // try {
    //   console.log(`Checking Message Ids of /${constants.LOG_INIT}`);
    //   if (msgIdSet.has(init.context.message_id)) {
    //     initObj.msgId2Err =
    //       `Message Id for ${constants.LOG_INIT} is not unique`;
    //   }
    //   dao.setValue("msgId", init.context.message_id);
    // } catch (error) {
    //   console.log(
    //     `Error while checking message id for /${constants.LOG_INIT}`,
    //     error
    //   );
    // }
    init=init.message.order

    try {
      console.log(`Storing billing object in /${constants.LOG_INIT}`);
      if (!init["billing"]) {
        initObj.bill = `Billing object missing in /${constants.RET_INIT}`;
      } else {
        const billing = init.billing;
        dao.setValue("billing", billing);
      }
    }catch (error) {
      console.log();(
        `!!Error while checking billing object in /${constants.log_INIT}`,err
      );
    }

    return initObj;
  }

module.exports = checkInit;
