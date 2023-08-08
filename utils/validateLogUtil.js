const fs = require("fs");
const _ = require("lodash");
const dao = require("../dao/dao");
const path = require("path");
const { getObjValues } = require("./utils");
const {sortMerge} = require("./mergeSort");
const Validate = require("./schemaVal");
const flowVal = require("./retail/businessVal")
const clean = require("./clean")

//TAT in on_select = sumof(time to ship in /on_search and TAT by LSP in logistics /on_search)
// If non-serviceable in /on_select, there should be domain-error

const validateLogs = (domain, dirPath) => {
  // const dirPath = path.join(__dirname, "test_logs");

  let msgIdSet = new Set();
  let ErrorObj = {};
  // flowId = dirPath.split('/').at(-1)
  // console.log(flowId)
  // flowError = ErrorObj[flowId] = {}


  // Sort Merge
  console.log(dirPath)
  const mergefile = path.join(dirPath, '../test.json')
  console.log(mergefile)
  sortMerge(dirPath, mergefile)
  console.log("Merged File created")

  //  Validation
   Validate(domain, mergefile, msgIdSet,ErrorObj);

  //let schemaVal = schemaValidate(mergefile, msgIdSet, flowError)

  // Business Flows Validation
  // flowObj = flowError['Business Flows Validation'] = {}
  // let businessVal = flowVal(mergefile, flowObj)
  

  // Cleaning output report

  let log = clean(ErrorObj)

  // Drop DB
  try {
    console.log("Flushing DB Data");
    dao.dropDB();
  } catch (error) {
    console.log("Error while removing LMDB");
  }
try {
  // outputfile = `log${flowId}.json`
  outputfile= 'log_report.json'

  // let out = getObjValues(ErrorObj['Schema'])

  fs.writeFileSync(outputfile, JSON.stringify(ErrorObj,null,4) , 'utf-8');
} catch (error) {
  console.log("!!ERROR writing output file",error)
}
 

  console.log("Report Generated Successfully!!");
};

module.exports = { validateLogs };


