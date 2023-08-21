const config = require("../config/config");
const constants = require("../utils/constants");
const checkConfirm = require("../utils/logs/logConfirm");
const checkInit = require("../utils/logs/logInit");
const checkOnConfirm = require("../utils/logs/logOnConfirm");
const checkOnInit = require("../utils/logs/logOnInit");
const checkOnSearch = require("../utils/logs/logOnSearch");
const checkSearch = require("../utils/logs/logSearch");
const checkOnUpdate = require("../utils/logs/logOnUpdate");
const checkUpdate = require("../utils/logs/logUpdate");
const checkOnStatus = require("../utils/logs/logOnStatus");
const validateSchema = require("../utils/schemaValidation");
const utils = require("../utils/utils");
const _ = require("lodash");

// const checkContext = (data, path) => {
//   console.log(
//     `Inside Context Validation Check....\n*** Validating context for ${path} ***`
//   );

//   if (!data) return;
//   let errObj = {};

//   if (_.isEmpty(errObj)) {
//     const result = { valid: true, SUCCESS: "Context Valid" };
//     console.log(result);
//     return result;
//   } else {
//     const result = { valid: false, ERRORS: errObj };
//     console.error(result);
//     return result;
//   }
// };

const checkMessage = (element, action, msgIdSet) => {
  // let msgIdSet={};
  const busnsErr = {};
  switch (action) {
    case "search":
      return checkSearch(element, msgIdSet);

    case "on_search":
      return checkOnSearch(element, msgIdSet);

    case "init":
      return checkInit(element, msgIdSet);

    case "on_init":
      return checkOnInit(element, msgIdSet);

    case "confirm":
      return checkConfirm(element, msgIdSet);

    case "on_confirm":
      return checkOnConfirm(element, msgIdSet);

    case "update":
      return checkUpdate(element,msgIdSet);

    case "on_update":
      return checkOnUpdate(element,msgIdSet)

    case "on_status":
      return checkOnStatus(element,msgIdSet)
  }
  return busnsErr;
};

module.exports = { checkMessage };
