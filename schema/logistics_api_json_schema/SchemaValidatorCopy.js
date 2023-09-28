const searchSchema1 = require("./v1.1/searchSchema");
const searchSchema2 = require("./v1.2/searchSchema2");
const onSearchSchema1 = require("./v1.1/onSearchSchema");
const onSearchSchema2 = require("./v1.2/onSearchSchema");
const initSchema1 = require("./v1.1/initSchema");
const initSchema2 = require("./v1.2/initSchema");
const onInitSchema1 = require("./v1.1/onInitSchema");
const onInitSchema2 = require("./v1.2/onInitSchema");
const confirmSchema1 = require("./v1.1/confirmSchema");
const confirmSchema2 = require("./v1.2/confirmSchema");

const fs = require("fs");
//const async = require("async");
const path = require("path");

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
const { loadMasterSchema } = require("./masterSchemacopy");

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

function isEndTimeGreater(data) {
  const startTime = parseInt(data.start);
  const endTime = parseInt(data.end);
  return startTime < endTime;
}
function isLengthValid(data) {
  return (
    data?.name.length + data?.building.length + data?.locality.length > 190
  );
}

const validate_schema = (data, schema) => {
  let error_list = [];
  try {
    validate = ajv
      .addSchema(searchSchema1)
      .addSchema(searchSchema2)
      .addSchema(onSearchSchema1)
      .addSchema(onSearchSchema2)
      .addSchema(initSchema1)
      .addSchema(initSchema2)
      .addSchema(onInitSchema1)
      .addSchema(onInitSchema2)
      .addSchema(confirmSchema1)
      .addSchema(confirmSchema2)

      .addKeyword("isEndTimeGreater", {
        validate: (schema, data) => isEndTimeGreater(data),
      })
      .addKeyword("isLengthValid", {
        validate: (schema, data) => isLengthValid(data),
      });

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
  const masterSchemaCopy = loadMasterSchema(data);
  console.log(masterSchemaCopy);
  error_list = validate_schema(data, masterSchemaCopy);
  return formatted_error(error_list);
};

module.exports = {
  validate_schema_master,
};
