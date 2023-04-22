const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const utils = require("../utils");
const validateSchema = require("../schemaValidation");
const constants = require("../constants");

const checkUpdate = (update, ErrorObj) => {
  let updtObj = ErrorObj;
  let itemsUpdt = {};

  try {
    update = update.message.order;

    try {
      console.log(`Saving items update_type in /${constants.RET_UPDATE}`);
      update.items.forEach((item, i) => {
        if (item.hasOwnProperty("tags")) {
          if (
            item.tags.update_type === "return" ||
            item.tags.update_type === "cancel"
          ) {
            itemsUpdt[item.id] = [item.quantity.count, item.tags.update_type];
          } else {
            updtObj.updtTypeErr = `items[${i}].tags.update_type can't be ${item.tags.update_type}`;
          }
        }
      });
      dao.setValue("itemsUpdt", itemsUpdt);
    } catch (error) {
      console.log(
        `!!Error while saving items update_type in /${constants.RET_UPDATE}`,
        error
      );
    }

    return ErrorObj
    //dao.setValue("updtObj", updtObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_UPDATE} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_UPDATE} API`,
        err
      );
    }
  }
};

module.exports = checkUpdate;
