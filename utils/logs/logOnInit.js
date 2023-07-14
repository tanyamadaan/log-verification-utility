const fs = require("fs");
const _ = require("lodash");
const { checkContext } = require("../../services/service");
const dao = require("../../dao/dao");
const validateSchema = require("../schemaValidation");
const constants = require("../constants");
const utils = require("../utils");

const checkOnInit = (data, msgIdSet) => {
  let on_init = data;
  const onInitObj = {};

  on_init = on_init.message.order;

  try {
    console.log(`Comparing order quote price and break up  in ${constants.LOG_ONINIT}`);
    if (on_init.hasOwnProperty("quote")) {
      let totalBreakup = 0;
      on_init.quote.breakup.forEach((breakup) => {
        totalBreakup += parseFloat(breakup.price.value);
      });
      console.log(parseFloat(on_init.quote.price.value));
      console.log(totalBreakup);
      if (parseFloat(on_init.quote.price.value) !== totalBreakup)
        onInitObj.quotePriceErr = `Quote price does not match the breakup total in ${constants.LOG_ONINIT}`;
    }
  } catch (err) {
    console.log(`!!Error fetching order quote price in ${constants.LOG_ONINIT}`, err);
  }


  return onInitObj;
};

module.exports = checkOnInit;
