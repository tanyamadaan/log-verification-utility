const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const utils = require("../utils");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");
const checkSelect = (select, ErrorObj) => {
  //list to store selected items

  let selectedPrice = 0;
  let itemsIdList = {};
  let itemsCtgrs = {};
  let itemsTat = {};
  let slctObj = ErrorObj;

  try {

    let order = select.message.order;

    let onSearch = dao.getValue("onSearch");

    let provider = onSearch["bpp/providers"].filter(
      (provider) => provider.id === order.provider.id
    );

    if (provider[0]) {
      provider = provider[0];
      dao.setValue("providerId", provider.id);
      dao.setValue("providerLoc", provider.locations[0].id);

      try {
        console.log(
          `Comparing provider location in /${constants.RET_ONSEARCH} and /${constants.RET_SELECT}`
        );
        if (provider.locations[0].id != order.provider.locations[0].id) {
          slctObj.prvdLoc = `provider.locations[0].id ${provider.locations[0].id} mismatches in /${constants.RET_ONSEARCH} and /${constants.RET_SELECT}`;
        }
      } catch (error) {
        console.log(
          `!!Error while comparing provider.location id in /${constants.RET_ONSEARCH} and /${constants.RET_SELECT}`,
          error
        );
      }

      console.log(
        `Mapping Item Ids with their counts, categories and prices /${constants.RET_ONSEARCH} and /${constants.RET_SELECT}`
      );
      try {
        order.items.forEach((item) => {
          let itemOnSearch = provider.items.find((it) => it.id === item.id);

          if (!itemOnSearch) {
            key = `id${item.id}`;
            slctObj[
              key
            ] = `Item Id ${item.id} does not exist in /${constants.RET_ONSEARCH}`;
          } else {
            console.log(
              `ITEM ID: ${item.id}, Price: ${itemOnSearch.price.value}, Count: ${item.quantity.count}`
            );
            if (
              item.location_id &&
              itemOnSearch.location_id != item.location_id
            ) {
              slctObj.itemLocErr = `Location id for Item ${item.id} mismatches in /${constants.RET_ONSEARCH} and /${constants.RET_SELECT}`;
            }
            itemsIdList[item.id] = item.quantity.count;
            itemsCtgrs[item.id] = itemOnSearch.category_id;
            itemsTat[item.id] = itemOnSearch["@ondc/org/time_to_ship"];
            selectedPrice += itemOnSearch.price.value * item.quantity.count;
          }
        });
        dao.setValue("itemsIdList", itemsIdList);
        dao.setValue("itemsCtgrs", itemsCtgrs);
        dao.setValue("selectedPrice", selectedPrice);
        dao.setValue("itemsTat", itemsTat);
        console.log(
          `Provider Id in /${constants.RET_ONSEARCH} and /${constants.RET_SELECT} matched`
        );
      } catch (error) {
        console.log(
          `!!Error while Comparing and Mapping Items in /${constants.RET_ONSEARCH} and /${constants.RET_SELECT}`,
          error
        );
      }
    } else {
      console.log(
        `Provider Ids in /${constants.RET_ONSEARCH} and /${constants.RET_SELECT} mismatch`
      );
      slctObj.prvdrIdMatch = `Provider Id ${order.provider.id} in /${constants.RET_SELECT} does not exist in /${constants.RET_ONSEARCH}`;
    }

    try {
      order.fulfillments.forEach((ff, indx) => {
        console.log(`Checking GPS Precision in /${constants.RET_SELECT}`);

        if (ff.hasOwnProperty("end")) {
          dao.setValue("buyerGps", ff.end.location.gps);
          dao.setValue("buyerAddr", ff.end.location.address.area_code);
          const gps = ff.end.location.gps.split(",");
          const gpsLat = gps[0];
          const gpsLong = gps[1];
          // console.log(gpsLat, " sfsfdsf ", gpsLong);
          if (!gpsLat || !gpsLong) {
            slctObj.gpsErr = `fulfillments location.gps is not as per the API contract`;
          }

          if (!ff.end.location.address.hasOwnProperty("area_code")) {
            slctObj.areaCode = `address.area_code is required property in /${constants.RET_SELECT}`;
          }
        } else {
          srchObj.endflfllmntObj = `fulfillments[${indx}].end object missing in /${constants.RET_SELECT} API`;
        }
      });
    } catch (error) {
      console.log(
        `!!Error while checking GPS Precision in /${constants.RET_SELECT}`,
        error
      );
    }

    console.log("Total Price of Selected Items:", selectedPrice);
    return ErrorObj
    //dao.setValue("slctObj", slctObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_SELECT} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_SELECT} API`,
        err
      );
    }
  }
};

module.exports = checkSelect;
