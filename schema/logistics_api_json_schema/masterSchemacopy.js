module.exports = {
  $id: "http://example.com/schema/masterSchemaCopy",
  type: "object",
  properties: {
    search: {
      type: "array",
      items: {
        $ref: "searchSchema#",
      },
    },
    on_search: {
      type: "array",
      items: {
        $ref: "onSearchSchema#",
      },
    },
  },
};
