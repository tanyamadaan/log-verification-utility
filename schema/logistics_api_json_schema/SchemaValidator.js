const onConfirmSchema = require("./v1.1/onConfirmSchema");
const onInitSchema = require("./v1.1/onInitSchema");
const onSearchSchema = require("./v1.1/onSearchSchema");
const onTrackSchema = require("./v1.1/onTrackSchema");
const onSupportSchema = require("./v1.1/onSupportSchema");
const onStatusSchema = require("./v1.1/onStatusSchema");
const onCancelSchema = require("./v1.1/onCancelSchema");
const onUpdateSchema = require("./v1.1/onUpdateSchema");
const searchSchema = require("./v1.1/searchSchema");
const initSchema = require("./v1.1/initSchema");
const confirmSchema = require("./v1.1/confirmSchema");
const statusSchema = require("./v1.1/statusSchema");
const updateSchema = require("./v1.1/updateSchema");
const cancelSchema = require("./v1.1/cancelSchema");
const supportSchema = require("./v1.1/supportSchema");
const trackSchema = require("./v1.1/trackSchema");

const commonSchemaV1_2 = require("./v1.2/common/commonSchema")


const masterSchema = require("./masterSchema");

const fs = require("fs");
//const async = require("async");

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

function isEndTimeGreater(data) {
  const startTime = parseInt(data.start);
  const endTime = parseInt(data.end);
  return startTime < endTime;
}

const validate_schema = (data, schema) => {
  const Ajv = require("ajv");
  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    strictRequired: false,
    strictTypes: false,
    verbose: true,
    $data: true,
  });

  const addFormats = require("ajv-formats");
  //const masterSchemacopy = require("./masterSchemacopy");

  addFormats(ajv);
  require("ajv-errors")(ajv);
  let error_list = [];
  try {
    validate = ajv
      .addSchema(searchSchema)
      .addSchema(onSearchSchema)
      .addSchema(initSchema)
      .addSchema(onInitSchema)
      .addSchema(confirmSchema)
      .addSchema(onConfirmSchema)
      .addSchema(updateSchema)
      .addSchema(onUpdateSchema)
      .addSchema(statusSchema)
      .addSchema(onStatusSchema)
      .addSchema(supportSchema)
      .addSchema(onSupportSchema)
      .addSchema(trackSchema)
      .addSchema(onTrackSchema)
      .addSchema(cancelSchema)
      .addSchema(onCancelSchema)
      .addSchema(searchSchema2)
      .addSchema(onSearchSchema2)
      .addSchema(initSchema2)
      .addSchema(onInitSchema2)
      .addSchema(confirmSchema2)
      .addSchema(onConfirmSchema2)
      .addSchema(updateSchema2)
      .addSchema(onUpdateSchema2)
      .addSchema(statusSchema2)
      .addSchema(onStatusSchema2)
      .addSchema(supportSchema2)
      .addSchema(onSupportSchema2)
      .addSchema(trackSchema2)
      .addSchema(onTrackSchema2)
      .addSchema(cancelSchema2)
      .addSchema(onCancelSchema2)
      .addKeyword("isEndTimeGreater", {
        validate: (schema, data) => isEndTimeGreater(data),
      })
      .addSchema(commonSchemaV1_2);
    
    validate = validate.compile(schema);

    const valid = validate(data);
    if (!valid) {
      error_list = validate.errors;
    }
  } catch (error) {
    console.log("ERROR!! validating schema");
    console.trace(error);
  }

  return error_list;
};

const validate_schema_master = (data) => {
  error_list = validate_schema(data, masterSchemaCopy);
  return formatted_error(error_list);
};

module.exports = {
  validate_schema_master,
};
