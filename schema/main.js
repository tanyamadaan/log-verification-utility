const retailSchemaValidator = require("./retail_api_json_schema/SchemaValidator");
const {validate_schema_master} = require("./logistics_api_json_schema/SchemaValidator");

const fs = require("fs");

const validate_schema_for_domain_json = (vertical, data) => {
  switch (vertical) {
    case "logistics":
      res = validate_schema_master(data);
      return res;
      break;
    default:
      console.log("Invalid Domain!!");
  }
};



module.exports = validate_schema_for_domain_json;