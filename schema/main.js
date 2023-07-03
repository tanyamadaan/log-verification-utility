const retailSchemaValidator = require("./retail_api_json_schema/SchemaValidator");
const logisticsSchemaValidator = require("./logistics_api_json_schema/SchemaValidator");

const fs = require("fs");

const validate_schema_for_domain_json = (vertical, api, data) => {
  switch (vertical) {
    case "retail":
      res = retailSchemaValidator[`validate_schema_${api}_${vertical}_for_json`](data);
      return res;
      break;
    case "logistics":
      res = logisticsSchemaValidator[`validate_schema_${api}_${vertical}_for_json`](data);
      return res;
      break;
    default:
      console.log("Invalid Domain!!");
  }
};



module.exports = validate_schema_for_domain_json;