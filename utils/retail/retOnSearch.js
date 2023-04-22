const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const { checkContext } = require("../../services/service");
const validateSchema = require("../schemaValidation");

const checkOnSearch = (onSearch, ErrorObj) => {
  let onSrchObj = ErrorObj;

  try {

    onSearch = onSearch.message.catalog;
    dao.setValue("onSearch", onSearch);

    return ErrorObj
    //dao.setValue("onSrchObj", onSrchObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for ${onSearch.context.action} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${onSearch.context.action} API`
      );
    }
  }
};

module.exports = checkOnSearch;
