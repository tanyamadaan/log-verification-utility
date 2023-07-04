const onConfirmSchema = require("./onConfirmSchema");
const onInitSchema = require("./onInitSchema");
const onSearchSchema = require("./onSearchSchema");
const onTrackSchema = require("./onTrackSchema");
const onSupportSchema = require("./onSupportSchema");
const onStatusSchema = require("./onStatusSchema");
const onCancelSchema = require("./onCancelSchema");
const onUpdateSchema = require("./onUpdateSchema");
const searchSchema = require("./searchSchema");
const initSchema = require("./initSchema");
const masterSchema= require("./masterSchema")
const confirmSchema = require("./confirmSchema");
const statusSchema = require("./statusSchema");
const updateSchema = require("./updateSchema");
const cancelSchema = require("./cancelSchema");
const supportSchema=require("./supportSchema");
const trackSchema=require("./trackSchema");
const fs = require("fs");
//const async = require("async");
const path = require("path");

const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  strict: "log",
  strictRequired: false,
  strictTypes: false,
  //verbose: true,
  $data: true
});
const addFormats = require("ajv-formats");
const masterSchemacopy = require("./masterSchemacopy");

addFormats(ajv);
require("ajv-errors")(ajv);

const formatted_error = (errors) => {
  error_list = [];
  let status = "";
  errors.forEach((error) => {
    error_dict = {
      message: `${error.message}${
        error.params.allowedValues ? ` (${error.params.allowedValues})` : ""
      }${error.params.allowedValue ? ` (${error.params.allowedValue})` : ""}${
        error.params.additionalProperty
          ? ` (${error.params.additionalProperty})`
          : ""
      }`,
      details: error.instancePath,
    };
    error_list.push(error_dict);
  });
  if (error_list.length === 0) status = "pass";
  else status = "fail";
  error_json = { errors: error_list, status: status };
  return error_json;
};

const validate_schema = (data, schema, addSchema) => {
  let error_list = [];
  validate = ajv.addSchema(searchSchema).addSchema(onSearchSchema).addSchema(initSchema).addSchema(onInitSchema).addSchema(confirmSchema).addSchema(onConfirmSchema).addSchema(updateSchema).addSchema(onUpdateSchema).addSchema(statusSchema).addSchema(onStatusSchema).addSchema(supportSchema).addSchema(onSupportSchema).addSchema(trackSchema).addSchema(onTrackSchema)
  validate = validate.compile(schema);
  
  const valid = validate(data);
  if (!valid) {
    error_list = validate.errors;
  }
  return error_list;
};

const validate_schema_master =(data)=>{
  error_list = validate_schema(data, (schema = masterSchemacopy));
  console.log(error_list)
  return formatted_error(error_list);
}
const validate_schema_search_logistics_for_json = (data) => {
  error_list = validate_schema(data, (schema = searchSchema));
  console.log(error_list)
  return formatted_error(error_list);
};

const validate_schema_on_search_logistics_for_json = (data) => {
  // transformed_item_data = transform_on_search_schema(data);
  error_list = validate_schema(data, (schema = onSearchSchema));
  console.log(error_list)
  return formatted_error(error_list);
};

const validate_schema_select_logistics_for_json = (data) => {
  error_list = validate_schema(data, (schema = selectSchema));
  return formatted_error(error_list);
};

const validate_schema_on_select_logistics_for_json = (data) => {

  error_list = validate_schema(data, (schema = onSelectSchema));
  return formatted_error(error_list);
};

const validate_schema_init_logistics_for_json = (data) => {
  addSchema = onSearchSchema
  error_list = validate_schema(data, (schema = initSchema), addSchema = onSearchSchema);
  console.log(error_list)
  return formatted_error(error_list);
};

const validate_schema_on_init_logistics_for_json = (data) => {
  error_list = validate_schema(data, (schema = onInitSchema), addSchema = initSchema);
  console.log(error_list)
  return formatted_error(error_list);
};

const validate_schema_confirm_logistics_for_json = (data) => {
  error_list = validate_schema(data, (schema = confirmSchema));
  console.log(error_list)
  return formatted_error(error_list);
};

const validate_schema_on_confirm_logistics_for_json = (data) => {

  error_list = validate_schema(data, (schema = onConfirmSchema));
  console.log(error_list)
  return formatted_error(error_list);
};

const validate_schema_status_logistics_for_json = (data) => {
  error_list = validate_schema(data, (schema = statusSchema));
  return formatted_error(error_list);
};

const validate_schema_on_status_logistics_for_json = (data) => {

  error_list = validate_schema(data, (schema = onStatusSchema));
  return formatted_error(error_list);
};

const validate_schema_cancel_logistics_for_json = (data) => {
  error_list = validate_schema(data, (schema = cancelSchema));
  return formatted_error(error_list);
};

const validate_schema_on_cancel_logistics_for_json = (data) => {

  error_list = validate_schema(data, (schema = onCancelSchema));
  return formatted_error(error_list);
};

const validate_schema_update_logistics_for_json = (data) => {
  error_list = validate_schema(data, (schema = updateSchema));
  return formatted_error(error_list);
};

const validate_schema_on_update_logistics_for_json = (data) => {

  error_list = validate_schema(data, (schema = onUpdateSchema));
  console.log(error_list)
  return formatted_error(error_list);
};

const validate_schema_track_logistics_for_json = (data) => {
  error_list = validate_schema(data, (schema = trackSchema));
  return formatted_error(error_list);
};

const validate_schema_on_track_logistics_for_json = (data) => {
 
  error_list = validate_schema(data, (schema = onTrackSchema));
  return formatted_error(error_list);
};

const validate_schema_support_logistics_for_json = (data) => {
  error_list = validate_schema(data, (schema = supportSchema));
  return formatted_error(error_list);
};

const validate_schema_on_support_logistics_for_json = (data) => {

  error_list = validate_schema(data, (schema = onSupportSchema));
  return formatted_error(error_list);
};

// const cwd = __dirname
// const curFile = path.join(cwd, '../../utils/logs/logistics/xpressbazar/Logistics')
// const on_update = path.join(curFile, 'on_update.json')
// let data=fs.readFileSync(on_update)
// data=JSON.parse(data)
// const update = path.join(curFile, 'update.json')
// let val_data6=fs.readFileSync(update)
// data["update"]=JSON.parse(val_data6)
// const curFile1 = path.join(curFile, 'on_confirm.json')
// let val_data7=fs.readFileSync(curFile1)
// data["on_confirm"]=JSON.parse(val_data7)
// const valData = path.join(curFile, 'init.json')
// let val_data=fs.readFileSync(valData)
// val_data=JSON.parse(val_data)
// data["init"] = val_data
// const valData1 = path.join(curFile, 'on_search.json')
// let val_data1 = fs.readFileSync(valData1)
// val_data=JSON.parse(val_data1)
// data["on_search"] = val_data
// const valData2 = path.join(curFile, 'on_init.json')
// let val_data2 = fs.readFileSync(valData2)
// val_data=JSON.parse(val_data2)
// data["on_init"] = val_data
// const valData3 = path.join(curFile, 'confirm.json')
// let val_data3 = fs.readFileSync(valData3)
// val_data=JSON.parse(val_data3)
// data["confirm"] = val_data
// const valData4 = path.join(curFile, 'search.json')
// let val_data4 = fs.readFileSync(valData4)
// val_data=JSON.parse(val_data4)
// data["search"] = val_data
// console.log(data)
// validate_schema_on_update_logistics_for_json(data)

// const valData1 = path.join(curFile, 'on_search.json')
// let val_data1 = fs.readFileSync(valData1)
// data=JSON.parse(val_data1)
// validate_schema_on_search_logistics_for_json(data)

// //validate_schema_status_logistics_for_json()
// const valData4 = path.join(curFile, 'status.json')
// let val_data4 = fs.readFileSync(valData4)
// val_data=JSON.parse(val_data4)
// data["search"] = val_data
// console.log(data)
// validate_schema_on_status_logistics_for_json()

let testData=fs.readFileSync("../../utils/testCopy.json")
testData=JSON.parse(testData)
try {
  const errors=validate_schema_master(testData)
  console.log(errors);
} catch (error) {
  console.log(`ERROR!!:`,error)
}



module.exports = {
  validate_schema_search_logistics_for_json,
  validate_schema_select_logistics_for_json,
  validate_schema_init_logistics_for_json,
  validate_schema_confirm_logistics_for_json,
  validate_schema_update_logistics_for_json,
  validate_schema_status_logistics_for_json,
  validate_schema_track_logistics_for_json,
  validate_schema_cancel_logistics_for_json,
  validate_schema_support_logistics_for_json,
  validate_schema_on_cancel_logistics_for_json,
  validate_schema_on_confirm_logistics_for_json,
  validate_schema_on_init_logistics_for_json,
  validate_schema_on_search_logistics_for_json,
  validate_schema_on_select_logistics_for_json,
  validate_schema_on_status_logistics_for_json,
  validate_schema_on_support_logistics_for_json,
  validate_schema_on_track_logistics_for_json,
  validate_schema_on_update_logistics_for_json,
  validate_schema_master
};
