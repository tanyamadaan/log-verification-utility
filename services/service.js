const config = require("../config/config");
const constants = require("../utils/constants");
const checkConfirm = require("../utils/logs/logConfirm");
const checkInit = require("../utils/logs/logInit");
const checkOnConfirm = require("../utils/logs/logOnConfirm");
const checkOnInit = require("../utils/logs/logOnInit");
const checkOnSearch = require("../utils/logs/logOnSearch");
const checkSearch = require("../utils/logs/logSearch");
const validateSchema = require("../utils/schemaValidation");
const utils = require("../utils/utils");
const _ = require("lodash");

const checkContext = (data, path) => {
  console.log(
    `Inside Context Validation Check....\n*** Validating context for ${path} ***`
  );

  if (!data) return;
  let errObj = {};



  //Transaction ID != Message ID
  if (data.transaction_id === data.message_id) {
    errObj.id_err = "transaction_id and message id can't be same";
  }

  if (data.ttl && data.ttl != constants.RET_CONTEXT_TTL) {
    {
      errObj.ttl_err = `ttl = ${constants.RET_CONTEXT_TTL} as per the API Contract`;
    }
  }

  if (data.timestamp) {
    let date = data.timestamp;
    result = utils.timestampCheck(date);
    if (result && result.err === "FORMAT_ERR") {
      errObj.timestamp_err =
        "Timestamp not in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format";
    } else if (result && result.err === "INVLD_DT") {
      errObj.timestamp_err = "Timestamp should be in date-time format";
    }
  }

  if (_.isEmpty(errObj)) {
    const result = { valid: true, SUCCESS: "Context Valid" };
    console.log(result);
    return result;
  } else {
    const result = { valid: false, ERRORS: errObj };
    console.error(result);
    return result;
  }
};

const checkMessage = (element,action,msgIdSet)=>{
  // let msgIdSet={};
  const busnsErr={};
  switch(action){
    case 'search':
      return checkSearch(element,msgIdSet)
      
    case 'on_search':
    return checkOnSearch(element,msgIdSet)

    case 'init':
     return checkInit(element,msgIdSet)

    case 'on_init':
     return checkOnInit(element,msgIdSet)

    case 'confirm':
    return checkConfirm(element,msgIdSet)

    case 'on_confirm':
      return  checkOnConfirm(element,msgIdSet)

  }
  return busnsErr;
}

module.exports = { checkContext , checkMessage};
