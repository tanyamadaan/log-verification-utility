const masterSchemaCopy = {
  $id: "http://example.com/schema/masterSchemaCopy",
  type: "object",
  properties: {
    search: {
      type: "array",
    },
    on_search: {
      type: "array",
    },
    init: {
      type: "array",
    },
    on_init: {
      type: "array",
    },
    confirm: {
      type: "array",
    },
  },
};

const loadMasterSchema = (data) => {
  const coreVersion = data?.search[0]?.context?.core_version;
  // console.log("core-version",coreVersion);
  if (coreVersion === "1.1.0") {
    masterSchemaCopy.properties.search.items = { $ref: "searchSchema/v1.1#" };
    masterSchemaCopy.properties.on_search.items = {
      $ref: "onSearchSchema/v1.1#",
    };
    masterSchemaCopy.properties.init.items = { $ref: "initSchema/v1.1#" };
    masterSchemaCopy.properties.on_init.items = { $ref: "onInitSchema/v1.1#" };
    masterSchemaCopy.properties.confirm.items = { $ref: "confirmSchema/v1.1#" };
  } else {
    masterSchemaCopy.properties.search.items = { $ref: "searchSchema/v1.2#" };
    masterSchemaCopy.properties.on_search.items = {
      $ref: "onSearchSchema/v1.2#",
    };
    masterSchemaCopy.properties.init.items = { $ref: "initSchema/v1.2#" };
    masterSchemaCopy.properties.confirm.items = { $ref: "confirmSchema/v1.2#" };
  }
  return masterSchemaCopy;
};

module.exports = { loadMasterSchema };
