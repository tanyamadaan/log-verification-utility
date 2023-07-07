const fs = require("fs");
const _ = require("lodash");
const dao = require("../dao/dao");
const path = require("path");
const { getObjValues } = require("./utils");
const {sortMerge} = require("./mergeSort");
const schemaValidate = require("./schemaVal");
const flowVal = require("./retail/businessVal")
const clean = require("./clean")

//TAT in on_select = sumof(time to ship in /on_search and TAT by LSP in logistics /on_search)
// If non-serviceable in /on_select, there should be domain-error

const validateLogs = (domain, dirPath) => {
  // const dirPath = path.join(__dirname, "test_logs");

  let msgIdSet = new Set();
  let ErrorObj = {};
  flowId = dirPath.split('/').at(-1)
  console.log(flowId)
  flowError = ErrorObj[flowId] = {}


  // Sort Merge
  const mergefile = path.join(dirPath, '../test.json')
  sortMerge(dirPath, mergefile)

  // Schema Validation
  let retailSchemaVal = schemaValidate(domain, mergefile, msgIdSet, flowError);
  //let schemaVal = schemaValidate(mergefile, msgIdSet, flowError)

  // Business Flows Validation
  flowObj = flowError['Business Flows Validation'] = {}
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
try {
  outputfile = `log${flowId}.json`

  fs.writeFileSync(outputfile, JSON.stringify(ErrorObj, null, 2) , 'utf-8');
} catch (error) {
  console.log("!!ERROR writing output file",)
}
 

  console.log("Report Generated Successfully!!");
};

module.exports = { validateLogs };


