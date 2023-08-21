const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils.js");

const checkSearch = (data, msgIdSet) => {
  let srchObj = {};
  let search = data;

  search = search.message.intent;

  dao.setValue("searchObj", search);

  return srchObj;
};

module.exports = checkSearch;
