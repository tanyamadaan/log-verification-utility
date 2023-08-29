const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils");
const checkOnSearch = (data, msgIdSet) => {
  const onSrchObj = {};
  let onSearch = data;
  let search = dao.getValue("searchObj");
  let validFulfillmentIDs = new Set();
  onSearch = onSearch.message.catalog;


  try {
    console.log(
      `Checking item fulfillment_id corresponding to one of the ids in bpp/fulfillments in /on_search api`
    );
    if (onSearch["bpp/providers"]) {
      let providers = onSearch["bpp/providers"];
      dao.setValue("providersArr", providers);
      providers.forEach((provider, i) => {
        let itemsArr = provider.items;
        const providerId = provider.id;
    
        dao.setValue(`${providerId}itemsArr`, itemsArr);
        itemsArr.forEach((item, j) => {
          if (!validFulfillmentIDs.has(item.fulfillment_id)) {
            onSrchObj.fulfillmentIDerr = `fulfillment_id of /items/${j} for /bpp/provider/${i} does not match with the id in bpp/fulfillments in ${constants.LOG_ONSEARCH} api`;
          }
          if (
            item.descriptor.code === "P2H2P" &&
            !search["@ondc/org/payload_details"].dimensions
          ) {
            let itemKey = `dimensionErr${j}`;
            onSrchObj[
              itemKey
            ] = `@ondc/org/payload_details/dimensions is a required property in /search request for 'P2H2P' shipments`;
          }
        });
      });
    }
  } catch (error) {
    console.log(
      `!!Error while checking fulfillment ids in /items in ${constants.LOG_ONSEARCH} api`,
      error
    );
  }

  return onSrchObj;
};

module.exports = checkOnSearch;
