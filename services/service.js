const { logisticsVal } = require("../utils/logistics/msgValidator");
const _ = require("lodash");

const checkMessage = (domain, element, action, msgIdSet) => {
  const busnsErr = {};
  switch (domain) {
    case "logistics":
      return logisticsVal(element, msgIdSet);
  }
  return busnsErr;
};
module.exports = { checkMessage };