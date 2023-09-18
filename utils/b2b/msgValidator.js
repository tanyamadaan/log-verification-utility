const checkConfirm = require("./b2bConfirm");
const checkInit = require("./b2bInit");
const checkOnConfirm = require("./b2bOnConfirm");
const checkOnInit = require("./b2bOnInit");
const checkOnSearch = require("./b2bOnSearch");
const checkOnUpdate = require("./b2bOnUpdate");
const checkUpdate = require("./b2bUpdate");
const checkOnStatus = require("./b2bOnStatus");
const checkSearch = require("./b2bSearch");
const _ = require("lodash");

const b2bVal = (element, action, msgIdSet) => {
  const busnsErr = {};
  switch (action) {
    case "search":
      return checkSearch(element, msgIdSet);

    case "on_search":
      return checkOnSearch(element, msgIdSet);

    case "on_status":
      return checkOnStatus(element,msgIdSet)
  }
  return busnsErr;
};
module.exports = { b2bVal };