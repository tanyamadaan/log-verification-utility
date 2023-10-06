const _ = require("lodash");
const dao = require("../../dao/dao");
const constants = require("../constants");
const utils = require("../utils.js");

const checkConfirm = (data, msgIdSet) => {
  let cnfrmObj = {};
  let confirm = data;
  let version = confirm.context.core_version;

  confirm = confirm.message.order;
  let rts;

  if (version === "1.1.0")
    rts = confirm?.fulfillments[0]?.tags["@ondc/org/order_ready_to_ship"];
  else {
    let fulTags = confirm?.fulfillments[0].tags;
    fulTags.forEach((tag) => {
      if (tag.code === "state") {
        const lists = tag.list;
        lists.forEach((list) => {
          if (list.code === "ready_to_ship") {
            rts = list.value;
          }
        });
      }
    });
  }

  dao.setValue("rts", rts);
  const cnfrmOrdrId = confirm.id;
  dao.setValue("cnfrmOrdrId", cnfrmOrdrId);
  let awbNo = false;
  let fulfillments = confirm.fulfillments;

  let p2h2p = dao.getValue("p2h2p");
  fulfillments.forEach((fulfillment) => {
    if (fulfillment["@ondc/org/awb_no"] && p2h2p) awbNo = true;
    if (
      fulfillment?.tags["@ondc/org/order_ready_to_ship"] === "yes" &&
      !fulfillment?.start?.instructions?.short_desc
    ) {
      cnfrmObj.instructionsErr = `PCC code is required in /fulfillments/start/instructions when ready_to_ship = 'yes'`;
    }
  });

  dao.setValue("awbNo", awbNo);
  return cnfrmObj;
};

module.exports = checkConfirm;
