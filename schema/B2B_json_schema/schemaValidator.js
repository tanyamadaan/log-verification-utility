const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fs = require("fs");
const path = require("path");
const ajv = new Ajv({
  allErrors: true,
  strict: "log",
  strictRequired: false,
  strictTypes: false,
  verbose: true,
  $data: true,
});
addFormats(ajv);

const schema = require("./search");
const dir = path.join(
  __dirname,
  "../Examples/B2B_json/search/search_by_item.json"
);

let data = fs.readFileSync(dir);
data = JSON.parse(data);

const valid = ajv.validate(schema, data);
if (!valid) console.log(ajv.errors);
