const { error } = require("ajv/dist/vocabularies/applicator/dependencies");

module.exports = {
  $id: "http://example.com/schema/onSearchSchema",
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
          const: "on_search",
        },
        core_version: {
          type: "string",
          const: "1.1.0",
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
          format: "date-time",
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
        catalog: {
          type: "object",
          properties: {
            "bpp/fulfillments": {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                    enum: ["Prepaid", "CoD", "RTO", "Reverse QC"],
                  },
                },
                required: ["id", "type"],
                if: {
                  properties: {
                    type: {enum: ["Prepaid", "CoD"]},
                  }
                },
                then: {
                  properties: {
                    id: {
                      const: {$data: "3/bpp~1providers/0/items/0/fulfillment_id"}
                    },
                  }
                },
                errorMessage: "Item Fulfilment id - ${2/bpp~1providers/0/items/0/fulfillment_id} does not match id - ${0/id} for ${0/type} defined under bpp/fulfillments",
              },
            },
            "bpp/descriptor": {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
              },
              required: ["name"],
            },
            "bpp/providers": {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  descriptor: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      short_desc: {
                        type: "string",
                      },
                      long_desc: {
                        type: "string",
                      },
                    },
                    required: ["name", "short_desc", "long_desc"],
                  },
                  categories: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        time: {
                          type: "object",
                          properties: {
                            label: {
                              type: "string",
                              const: "TAT",
                            },
                            duration: {
                              type: "string",
                              pattern:
                                "^PT([1-9]|[1-9][0-9])?(D|H)$|^PT([1-5][1-9]|60)?M$",
                              errorMessage: "Duration is not correct",
                            },
                          },
                          required: ["label", "duration"],
                        },
                      },
                      required: ["id"],
                      anyOf: [
                        {
                          properties: {
                            id: { const: "Immediate Delivery" },
                            time: {
                              type: "object",
                              properties: {
                                duration: {
                                  type: "string",
                                  pattern:
                                    "^PT([1-5][1-9]|60)?M$",
                                  errorMessage:
                                    "Duration is not correct as per Immediate Delivery",
                                },
                              },
                              required: ["label", "duration"],
                            },
                          },
                          required: ["id", "time"],
                        },
                        {
                          not: {
                            properties: {
                              id: { const: "Immediate Delivery" },
                              time: {
                                type: "object",
                                properties: {
                                  duration: {
                                    type: "string",
                                    pattern: "^PT([1-5][1-9]|60)?M$",
                                  },
                                },
                                required: ["label", "duration"],
                              },
                            },
                            required: ["id", "time"],
                          },
                        },
                      ],
                    },
                  },
                  locations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        gps: {
                          type: "string",
                        },
                        address: {
                          type: "object",
                          properties: {
                            street: {
                              type: "string",
                            },
                            city: {
                              type: "string",
                            },
                            area_code: {
                              type: "string",
                            },
                            state: {
                              type: "string",
                            },
                          },
                          required: ["street", "city", "area_code", "state"],
                        },
                      },
                      required: [],
                    },
                  },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        parent_item_id: {
                          type: "string",
                        },
                        category_id: {
                          type: "string",
                        },
                        fulfillment_id: {
                          type: "string",
                        },
                        descriptor: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                              enum: ["P2P", "P2H2P"],
                            },
                            name: {
                              type: "string",
                            },
                            short_desc: {
                              type: "string",
                            },
                            long_desc: {
                              type: "string",
                            },
                          },
                          required: ["code", "name", "short_desc", "long_desc"],
                          anyOf: [
                            {
                              properties: {
                                code: {const: "P2H2P"}
                              },
                              required: ["/search/0/message/intent/@ondc~1org~1payload_details/dimensions"],
                              errorMessage: "@ondc/org/payload_details/dimensions required for P2H2P"
                            },
                            {
                              properties: {
                                code: {const: "P2P", errorMessage: "@ondc/org/payload_details/dimensions required for P2H2P"},
                              },
                            }
                          ],
                          errorMessage: "@ondc/org/payload_details/dimensions required for P2H2P"
                        },
                        price: {
                          type: "object",
                          properties: {
                            currency: {
                              type: "string",
                            },
                            value: {
                              type: "string",
                            },
                          },
                          required: ["currency", "value"],
                        },
                        time: {
                          type: "object",
                          properties: {
                            label: {
                              type: "string",
                              const: "TAT",
                            },
                            duration: {
                              type: "string",
                              format: "duration",
                              errorMessage: "${2/time/duration}",
                            },
                            timestamp: {
                              type: "string",
                              format: "date-time",
                            },
                          },
                          required: ["label", "duration", "timestamp"],
                        },
                      },
                      required: [
                        "id",
                        "category_id",
                        "fulfillment_id",
                        "descriptor",
                        "price",
                      ],
                    },
                  },
                },
                oneOf: [
                  {
                    properties: {
                      categories: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { const: "Immediate Delivery" },
                          },
                        },
                      },
                    },
                    not: {
                      required: ["locations"],
                    },
                  },
                  {
                    not: {
                      properties: {
                        categories: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { const: "Immediate Delivery" },
                            },
                          },
                        },
                      },
                    },
                  },
                ],
                required: ["id", "descriptor", "categories", "items"],
              },
            },
          },
          required: ["bpp/fulfillments", "bpp/descriptor", "bpp/providers"],
        },
      },
      required: ["catalog"],
    },
    search: {
      type: "array",
      items: {
        $ref: "searchSchema#",
      },
    },
  },
  required: ["context", "message"],
};
