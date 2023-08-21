const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require ("../utils.js");

const checkConfirm = (data, msgIdSet) => {
 
  let cnfrmObj = {};
  let confirm = data;

    confirm = confirm.message.order;
    let rts= confirm?.fulfillments[0]?.tags['@ondc/org/order_ready_to_ship'];
    dao.setValue("rts",rts);
    const cnfrmOrdrId = confirm.id;
    dao.setValue("cnfrmOrdrId", cnfrmOrdrId);
   let awbNo= false;
  let fulfillments = confirm.fulfillments;

  let p2h2p = dao.getValue("p2h2p")
  fulfillments.forEach(fulfillment => {
    if(fulfillment["@ondc/org/awb_no"] && p2h2p) awbNo= true;
  });
  
  dao.setValue("awbNo",awbNo);
    return cnfrmObj;
};

module.exports = checkConfirm;
