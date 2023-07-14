const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils");

const checkSearch = (data, msgIdSet) => {
  const searchObj = {};
  let search = data;
  // storing values to DB
  dao.setValue("tmpstmp", search.context.timestamp);
  dao.setValue("txnId", search.context.transaction_id);
  dao.setValue("msgId", search.context.message_id);
  msgIdSet.add(search.context.message_id);

  search = search.message.intent;
  try {
    console.log(
      `Checking payment object in case of CoD for ${constants.LOG_SEARCH} api`
    );
    if (search.hasOwnProperty("fulfillment")) {
      if (search.fulfillment.type === "CoD") {
        const payment = search.payment;
        if (!payment || !payment["@ondc/org/collection_amount"])
          searchObj.paymentErr = `Payment object is required for fulfillment type 'CoD'`;
      }
    }
  } catch (error) {
    console.log("!!Error while fetching fulfillment object", error);
  }

  try {
    console.log(
      `Checking category in payload details for ${constants.LOG_SEARCH} api`
    );
    const ctgry = search["@ondc/org/payload_details"].category;
    if (!utils.logCategory.has(ctgry)) {
      searchObj.pylodCtgry = `category ${search["@ondc/org/payload_details"].category} is not a valid category (should be one of the [allowed categories](https://docs.google.com/spreadsheets/d/1Rj7Hqdvmzup5kAvzbW15NgX5dV4U8c7DtvFopCW_9cc/edit#gid=0))`;
    }
  } catch (error) {
    console.log(`Error checking category in payload details`)
  }
  return searchObj;
};

module.exports = checkSearch;
