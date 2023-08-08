module.exports = {
  $id: "http://example.com/schema/onSupportSchema",
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          const: "nic2004:60232",
        },
        country: {
          type: "string",
        },
        city: {
          type: "string",
          const: { $data: "/search/0/context/city" },
        },
        action: {
          type: "string",
          const: "on_support",
        },
        core_version: {
          type: "string",
          const:"1.1.0"
        },
        bap_id: {
          type: "string",
        },
        bap_uri: {
          type: "string",
        },
        bpp_id: {
          type: "string",
        },
        bpp_uri: {
          type: "string",
        },
        transaction_id: {
          type: "string",
        },
        message_id: {
          type: "string",
        },
        timestamp: {
          type: "string",
          format:"date-time"
        },
      },
      required: [
        "domain",
        "country",
        "city",
        "action",
        "core_version",
        "bap_id",
        "bap_uri",
        "bpp_id",
        "bpp_uri",
        "transaction_id",
        "message_id",
        "timestamp",
      ],
    },
    message: {
      type: "object",
      properties: {
        phone: {
          type: "string",
        },
        email: {
          type: "string",
        },
        uri: {
          type: "string",
        },
      },
      required: ["phone", "email", "uri"],
    },
  },
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
  required: ["context", "message"],
};
