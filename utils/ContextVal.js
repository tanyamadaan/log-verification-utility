const fs = require("fs");
const _ = require("lodash");
const dao = require("../dao/dao");
const constants = require("./constants");
const utils = require("./utils");
const { checkContext } = require("../services/service");
const validateSchema = require("./schemaValidation");

const checkContextVal = (payload, Obj, msgIdSet) => {
  try {
    action = payload.context.action;
    if (!Obj.hasOwnProperty(action)) {
      Obj[action] = {};
    }

    let data = payload.context;
    if (data.timestamp) {
      let date = data.timestamp;
      result = utils.timestampCheck(date);
      if (result && result.err === "FORMAT_ERR") {
        Obj[action].tmstmpFrmt_err =
          "Timestamp not in RFC 3339 (YYYY-MM-DDTHH:MN:SS.MSSZ) Format";
      } else if (result && result.err === "INVLD_DT") {
        Obj[action].tmstmpFrmt_err = "Timestamp should be in date-time format";
      }
    }

    try {
      if (action !== "on_status") {
        console.log(`Comparing timestamp of /${action}`);
        console.log(action, dao.getValue("tmpstmp"), payload.context.timestamp);
        if (_.gte(dao.getValue("tmpstmp"), payload.context.timestamp)) {
          if (
            action === "support" ||
            action === "track" ||
            action === "update" ||
            action === "cancel"
          ) {
            dao.setValue(`${action}Tmpstmp`, payload.context.timestamp);
          } else if (
            action === "on_support" ||
            action === "on_track" ||
            action === "on_update" ||
            action === "on_cancel"
          ) {
            if (
              _.gte(
                dao.getValue(`${action.replace("on_", "")}Tmpstmp`),
                payload.context.timestamp
              )
            ) {
              Obj[action].tmpstmp = `Timestamp for /${action.replace(
                "on_",
                ""
              )} api cannot be greater than or equal to /${action} api`;
            }
          }
          Obj[action].tmpstmp = `Timestamp mismatch for /${action} `;
        } else {
          if (
            action === "on_search" ||
            action === "on_init" ||
            action === "on_confirm"
          ) {
            const timeDiff = utils.timeDiff(
              payload.context.timestamp,
              dao.getValue("tmpstmp")
            );
            console.log(timeDiff);
            if (timeDiff > 1000) {
              Obj[
                action
              ].tmpstmp = `context/timestamp difference between ${action} and ${action.replace(
                "on_",
                ""
              )} should be smaller than 1 sec`;
            }
          }
        }
        dao.setValue("tmpstmp", payload.context.timestamp);
      }
    } catch (error) {
      console.log(`Error while comparing timestamp for /${action} api`);
      console.trace(error);
    }

    // try {
    //   console.log(
    //     `Comparing Message Id of /${action}`
    //   );
    //   if (action.includes("on_")) {
    //     if (!_.isEqual(dao.getValue("msgId"), payload.context.message_id)) {
    //         Obj[action].msgId = `Message Id for /${action.replace('on_', '')} and /${action} api should be same`;
    //     }
    //     msgIdSet.add(payload.context.message_id);
    // }
    // else {
    //     if (msgIdSet.has(payload.context.message_id)) {
    //         Obj[action].msgId2 = "Message Id cannot be same for different sets of APIs";
    //       }
    //     dao.setValue("msgId", payload.context.message_id);
    // }
    // } catch (error) {
    //   console.log(
    //     `Error while comparing message id for /${action} api`,
    //     error
    //   );
    // }
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${action} API!`);
    } else {
      console.log(`!!Some error occurred while checking /${action} API`, err);
    }
  }
};

module.exports = checkContextVal;
