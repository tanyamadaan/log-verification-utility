const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils");
const checkOnSearch = (data, msgIdSet) => {
  const onSrchObj = {};
  let onSearch = data;


  onSearch = onSearch.message.catalog;

  try {
    console.log(
      `Checking TAT for category or item in ${constants.LOG_ONSEARCH} api`
    );
    if (onSearch.hasOwnProperty("bpp/providers")) {
      onSearch["bpp/providers"].forEach((provider) => {
        provider.categories.forEach((category) => {
          const catName = category.id;
          const categoryTime = category.time;
          provider.items.forEach((item) => {
            const catId = item.category_id;
            const itemTime = item.time;
            if (catName === catId && !categoryTime && !itemTime)
              onSrchObj.TAT = `Either Category level TAT or Item level TAT should be given in ${constants.LOG_ONSEARCH} api for category "${catName}"`;
          });
        });
      });
    }
  } catch (error) {
    console.log(`!!Error while fetching category and item TAT`, error);
  }

  //forward and backward shipment
  try {
    console.log(
      `Checking forward and backward shipment in ${constants.LOG_ONSEARCH} api`
    );

    if (onSearch["bpp/fulfillments"]) {
      const fulfillments = onSearch["bpp/fulfillments"];

      let hasForwardShipment = false;
      let hasBackwardShipment = false;

      for (const fulfillment of fulfillments) {
        if (fulfillment.type === "Prepaid" || fulfillment.type === "CoD") {
          hasForwardShipment = true;
        } else if (
          fulfillment.type === "RTO" ||
          fulfillment.type === "Reverse QC"
        ) {
          hasBackwardShipment = true;
        }
      }

      if (hasForwardShipment && hasBackwardShipment) {
        console.log("Both forward and backward shipments are present.");
      } else if (!hasForwardShipment) {
        onSrchObj.frwrdShpmnt = `Forward shipment (Prepaid or CoD) is missing in ${constants.LOG_ONSEARCH} api`;
      } else if (!hasBackwardShipment) {
        onSrchObj.bkwrdshmpnt = `Backward shipment (RTO or Reverse QC) is missing in ${constants.LOG_ONSEARCH} api`;
      }
    }
  } catch (error) {
    console.log(
      `!!Error while checking forward/backward shipment in ${constants.LOG_ONSEARCH} api`,
      error
    );
  }

  return onSrchObj;
};

module.exports = checkOnSearch;
