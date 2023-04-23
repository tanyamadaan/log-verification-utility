const fs = require("fs");
const _ = require("lodash");
const dao = require("../dao/dao");
const path = require("path");
const { getObjValues } = require("./utils");
const sortMerge = require("./mergeSort");
const schemaValidate = require("./schemaVal");
const flowVal = require("./retail/businessVal")
const clean = require("./clean")

//TAT in on_select = sumof(time to ship in /on_search and TAT by LSP in logistics /on_search)
// If non-serviceable in /on_select, there should be domain-error

const validateLogs = (dirPath) => {
  // const dirPath = path.join(__dirname, "test_logs");

  let msgIdSet = new Set();
  let ErrorObj = {};

  // Sort Merge
  const mergefile = path.join(dirPath, 'test.json')
  let merge = sortMerge(dirPath, mergefile)

  // Schema Validation

  let schemaVal = schemaValidate(mergefile, msgIdSet, ErrorObj)

  // Business Flows Validation
  flowObj = ErrorObj['Business Flows Validation'] = {}
  let businessVal = flowVal(mergefile, flowObj)
  

  // Cleaning output report

  let log = clean(ErrorObj)
  console.log(ErrorObj)

  // Drop DB
  try {
    console.log("Flushing DB Data");
    dao.dropDB();
  } catch (error) {
    console.log("Error while removing LMDB");
  }

  outputfile = `log${dirPath.split('/').at(-1)}.json`

  fs.writeFileSync(outputfile, JSON.stringify(ErrorObj, null, 2) , 'utf-8');

  console.log("Report Generated Successfully!!");
};

module.exports = { validateLogs };


