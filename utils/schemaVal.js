const dao = require("../dao/dao");
const fs = require("fs");
const utils = require("./utils");
const constants = require("./constants");
const { checkMessage } = require("../services/service");
const validateSchema = require("./schemaValidation");
const path = require("path");
const checkContextVal = require("./ContextVal");

const Validate = (domain, dirPath, msgIdSet, ErrorObj) => {
  try {
    let log = fs.readFileSync(dirPath);
    log = JSON.parse(log);
    count = 0;

    console.log("Inside validation service");
    // Validating Schema
    try {
      if (!("Schema" in ErrorObj)) ErrorObj["Schema"] = {};
      schemaObj = ErrorObj["Schema"];
      //console.log(`Validating Schema for ${action} API`);
      const vs = validateSchema(domain, log, schemaObj);
      console.log(vs);
      if (vs != "error") {
        // console.log(vs);
        Object.assign(schemaObj, vs);
      }
    } catch (error) {
      console.log(`!!Error occurred while performing schema validation`, error);
    }
    Object.entries(log).forEach(([action, elements]) => {
      // Validate schema for each element in the array associated with the action
      elements.forEach((element, i) => {
        // Validate context
        // try {
        //   res = checkContext(element.context, action);
        //   console.log(`Context check completed for ${action}`);
        // } catch (error) {
        //   console.log(
        //     `!!Some error occurred while checking /${action} context`,
        //     error
        //   );
        // }

        // Storing Values to DB
        // try {
        //   if (!("DB Errors" in ErrorObj)) {
        //     DBObj = ErrorObj["DB Errors"] = {};
        //   } else {
        //     DBObj = ErrorObj["DB Errors"];
        //   }
        //   let dbKeys = constants.DB_Keys;
        //   if (dbKeys.hasOwnProperty(action)) {
        //     if (!DBObj.hasOwnProperty(action)) DBObj[action] = {};
        //     obj = dbKeys[action];

        //     const iterate = (obj) => {
        //       Object.keys(obj).forEach((key) => {
        //         if (key == "context" || key == "message") {
        //           value = element;
        //         }
        //         if (typeof obj[key] === "object" && obj[key] !== null) {
        //           if (!(key in value)) {
        //             Object.assign(DBObj[action], `${key} does not exist`);
        //           } else {
        //             value = value[key];
        //             iterate(obj[key]);
        //           }
        //         } else {
        //           key = obj[key];
        //           if (!(key in value)) {
        //             Object.assign(DBObj[action], "key does not exist");
        //           } else {
        //             dao.setValue(key.split("/").at(-1), value[key]);
        //             if (key.includes("message_id")) {
        //               msgIdSet.add(value);
        //             }
        //           }
        //         }
        //       });
        //     };

        //     iterate(obj);
        //     console.log(`DB insert completed for /${action}`);
        //   }
        //   if (!res.valid) {
        //     Object.assign(DBObj[action], res.ERRORS);
        //   }
        // } catch (error) {
        //   console.log(
        //     `!!Some error occurred while storing values in DB for /${action} context`,
        //     error
        //   );
        // }

        // Validating action context level checks
        try {
          if (!("Context" in ErrorObj)) ErrorObj["Context"] = {};
          CntxtObj = ErrorObj["Context"];
          console.log(`Comparing context values for ${action} api`);
          if (action != "search") {
            let ValCheck = checkContextVal(element, CntxtObj, msgIdSet);
          } else {
            dao.setValue("tmpstmp", element.context.timestamp);
          }
        } catch (error) {
          console.log(
            `!!Error occurred while performing ${action} context values validation`,
            error
          );
        }

        // Business validations
        try {
          if (!("Message" in ErrorObj)) ErrorObj["Message"] = {};
          ErrorObj["Message"][`${action}_${i}`] = checkMessage(
            element,
            action,
            msgIdSet,
            domain
          );
        } catch (error) {
          console.log(
            `!!Some error occurred while checking /${action} api message`,
            error
          );
        }

        // Validating action message level checks

        // try {
        //   if (!("Message" in ErrorObj)) ErrorObj["Message"] = {};
        //   if (!(action in ErrorObj["Message"]))
        //     ErrorObj["Message"][action] = {};
        //   msgObj = ErrorObj["Message"][action];
        //   console.log(`Validating message level attributes for /${action} api`);
        //   action = action
        //     .replace(/(^|[\_])\S/g, function (match) {
        //       return match.toUpperCase();
        //     })
        //     .replace("_", "");

        //   // valFunc = `check${action}(element, msgObj)`;
        //   // let msgVal = eval(valFunc);
        // } catch (error) {
        //   console.log(
        //     `!!Error occurred while performing ${action} specific validation`,
        //     error
        //   );
        // }
      });
    
      return ErrorObj;
    });
  } catch (error) {
    console.log(error);
  }
};

// const cwd = __dirname
// const directory = path.join(cwd, '../logs')
// const destination = path.join(directory, 'test.json')
// //const logsPath = path.join(__dirname, "..", dirPath);
// let msgIdSet = new Set();
// ErrorObj = {}
// //           //"select": ['provider.id', 'provider.location', 'itemsIdList', 'itemsCtgrs', 'selectedPrice', 'itemsTat', 'buyerGps', 'buyerAddr']}
// let srchResp = schemaValidate(destination, msgIdSet, ErrorObj);
module.exports = Validate;
