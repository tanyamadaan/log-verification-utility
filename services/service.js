const config = require("../config/config");
const constants = require("../utils/constants");
const checkLogConfirm = require("../utils/logs/logConfirm");
const checkLogInit = require("../utils/logs/logInit");
const checkLogOnConfirm = require("../utils/logs/logOnConfirm");
const checkLogOnInit = require("../utils/logs/logOnInit");
const checkLogOnSearch = require("../utils/logs/logOnSearch");
const checkLogSearch = require("../utils/logs/logSearch");
const checkLogOnUpdate = require("../utils/logs/logOnUpdate");
const checkLogUpdate = require("../utils/logs/logUpdate");
const checkLogOnStatus = require("../utils/logs/logOnStatus");
const checkB2BConfirm = require("../utils/b2b/b2bConfirm");
const checkB2BInit = require("../utils/b2b/b2bInit");
const checkB2BOnConfirm = require("../utils/b2b/b2bOnConfirm");
const checkB2BOnInit = require("../utils/b2b/b2bOnInit");
const checkB2BOnSearch = require("../utils/b2b/b2bOnSearch");
const checkB2BSearch = require("../utils/b2b/b2bSearch");
const checkB2BOnUpdate = require("../utils/b2b/b2bOnUpdate");
const checkB2BUpdate = require("../utils/b2b/b2bUpdate");
const checkB2BOnStatus = require("../utils/b2b/b2bOnStatus");
const validateSchema = require("../utils/schemaValidation");
const utils = require("../utils/utils");
const _ = require("lodash");

const checkMessage = (element, action, msgIdSet,domain) => {
  // let msgIdSet={};
  const busnsErr = {};

  if (domain === "logistics") {

    switch (action) {
      case "search":
        return checkLogSearch(element, msgIdSet);

      case "on_search":
        return checkLogOnSearch(element, msgIdSet);

      case "init":
        return checkLogInit(element, msgIdSet);

      case "on_init":
        return checkLogOnInit(element, msgIdSet);

      case "confirm":
        return checkLogConfirm(element, msgIdSet);

      case "on_confirm":
        return checkLogOnConfirm(element, msgIdSet);

      case "update":
        return checkLogUpdate(element, msgIdSet);

      case "on_update":
        return checkLogOnUpdate(element, msgIdSet);

      case "on_status":
        return checkLogOnStatus(element, msgIdSet);
    }
  } else if (domain === "b2b") {

    switch (action) {
      case "search":
        return checkB2BSearch(element, msgIdSet);

      case "on_search":
        return checkB2BOnSearch(element, msgIdSet);

      case "init":
        return checkB2BInit(element, msgIdSet);

      case "on_init":
        return checkB2BOnInit(element, msgIdSet);

      case "confirm":
        return checkB2BConfirm(element, msgIdSet);

      case "on_confirm":
        return checkB2BOnConfirm(element, msgIdSet);

      case "update":
        return checkB2BUpdate(element, msgIdSet);

      case "on_update":
        return checkB2BOnUpdate(element, msgIdSet);

      case "on_status":
        return checkB2BOnStatus(element, msgIdSet);
    }
  }

  return busnsErr;
};

module.exports = { checkMessage };
