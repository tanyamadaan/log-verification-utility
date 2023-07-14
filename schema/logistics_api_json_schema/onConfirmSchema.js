module.exports = {
  $id: "http://example.com/schema/onConfirmSchema",
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
          const: { $data: "/on_search/context/city" },
        },
        action: {
          type: "string",
          const: "on_confirm",
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
          const: { $data: "/confirm/context/transaction_id" },
        },
        message_id: {
          type: "string",
          allOf: [
            {
              const: { $data: "/confirm/context/message_id" },
            },
            {
              not: {
                const: { $data: "1/transaction_id" },
              },
              errorMessage: "${1/transaction_id}",
            },
          ],
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
        order: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            state: {
              type: "string",
              enum: ["Created", "Accepted", "Cancelled"],
            },
            provider: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                locations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                    },
                    required: ["id"],
                  },
                },
              },
              required: ["id"],
              oneOf: [
                {
                  required: [
                    "/confirm/message/order/provider/locations",
                    "locations",
                  ],
                },
                {
                  not: {
                    required: [
                      "/confirm/message/order/provider/locations",
                      "locations",
                    ],
                  },
                },
              ],
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  category_id: {
                    type: "string",
                  },
                  descriptor: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                      },
                    },
                    required: ["code"],
                  },
                },
                required: ["id", "category_id", "descriptor"],
              },
            },
            quote: {
              type: "object",
              const: { $data: "/on_init/message/order/quote" },
              errorMessage: "Quote object mismatches in /init and /on_confirm.",
              properties: {
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
                breakup: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      "@ondc/org/item_id": {
                        type: "string",
                      },
                      "@ondc/org/title_type": {
                        type: "string",
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
                    },
                    required: [
                      "@ondc/org/item_id",
                      "@ondc/org/title_type",
                      "price",
                    ],
                  },
                },
              },
              required: ["price", "breakup"],
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    const: {
                      $data: "/confirm/message/order/fulfillments/0/id",
                    },
                  },
                  type: {
                    type: "string",
                    const: {
                      $data: "/confirm/message/order/fulfillments/0/type",
                    },
                  },
                  state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            const: "Pending",
                          },
                        },
                        required: ["code"],
                      },
                    },
                    required: ["descriptor"],
                  },
                  "@ondc/org/awb_no": {
                    type: "string",
                    minLength: 11,
                    maxLength: 16,
                  },
                  tracking: {
                    type: "boolean",
                  },
                  start: {
                    type: "object",
                    properties: {
                      time: {
                        type: "object",
                        properties: {
                          range: {
                            type: "object",
                            properties: {
                              start: {
                                type: "string",
                              },
                              end: {
                                type: "string",
                              },
                            },
                            required: ["start", "end"],
                          },
                        },
                        required: ["range"],
                      },
                    },
                    required: [],
                  },
                  end: {
                    type: "object",
                    properties: {
                      time: {
                        type: "object",
                        properties: {
                          range: {
                            type: "object",
                            properties: {
                              start: {
                                type: "string",
                              },
                              end: {
                                type: "string",
                              },
                            },
                            required: ["start", "end"],
                          },
                        },
                        required: ["range"],
                      },
                    },
                    required: ["time"],
                  },
                  agent: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      phone: {
                        type: "string",
                      },
                    },
                    required: ["name", "phone"],
                  },
                  vehicle: {
                    type: "object",
                    properties: {
                      category: {
                        type: "string",
                      },
                      size: {
                        type: "string",
                      },
                      registration: {
                        type: "string",
                      },
                    },
                    required: ["category", "size", "registration"],
                  },
                  "@ondc/org/ewaybillno": {
                    type: "string",
                  },
                  "@ondc/org/ebnexpirydate": {
                    type: "string",
                  },
                },
                required: ["id", "type", "state", "tracking"],
                anyOf: [
                  {
                    confirm: {
                      properties: {
                        message: {
                          properties: {
                            order: {
                              fulfillments: {
                                items: {
                                  properties: {
                                    "@ondc/org/order_ready_to_ship": {
                                      enum: ["yes", "Yes"],
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    required: ["start"],
                  },
                  {
                    not: {
                      confirm: {
                        properties: {
                          message: {
                            properties: {
                              order: {
                                fulfillments: {
                                  items: {
                                    properties: {
                                      "@ondc/org/order_ready_to_ship": {
                                        enum: ["yes", "Yes"],
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                ],
                errorMessage:
                  "Fulfillment object should include start instructions if ready_to_ship is Yes",
                anyOf: [
                  {
                    required: [
                      "/confirm/message/order/fulfillments/0/start",
                      "start",
                    ],
                  },
                  {
                    not: {
                      required: [
                        "/confirm/message/order/fulfillments/0/start",
                        "start",
                      ],
                    },
                  },
                ],
              },
            },
            billing: {
              type: "object",
              const: { $data: "/init/message/order/billing" },
              properties: {
                name: {
                  type: "string",
                },
                address: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    building: {
                      type: "string",
                    },
                    locality: {
                      type: "string",
                    },
                    city: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    country: {
                      type: "string",
                    },
                    area_code: {
                      type: "string",
                    },
                  },
                  required: [
                    "name",
                    "building",
                    "locality",
                    "city",
                    "state",
                    "country",
                    "area_code",
                  ],
                },
                tax_number: {
                  type: "string",
                },
                phone: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                created_at: {
                  type: "string",
                },
                updated_at: {
                  type: "string",
                },
              },
              required: [
                "name",
                "address",
                "phone",
                "email",
                "created_at",
                "updated_at",
              ],
            },
            created_at: {
              type: "string",
              const: { $data: "/confirm/context/timestamp" },
              errorMessage:
                "created_at does not match confirm context timestamp - ${/confirm/context/timestamp}",
            },
            updated_at: {
              type: "string",
            },
          },
          required: [
            "id",
            "state",
            "provider",
            "items",
            "quote",
            "fulfillments",
            "billing",
            "created_at",
            "updated_at",
          ],
          oneOf: [
            {
              allOf: [
                {
                  properties: {
                    items: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          descriptor: {
                            properties: {
                              code: { const: "P2H2P" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                {
                  anyOf: [
                    {
                      properties: {
                        fulfillments: {
                          required: [
                            "@ondc/org/awb_no",
                            "@ondc/org/ewaybillno",
                            "@ondc/org/ebnexpirydate",
                          ],
                        },
                      },
                    },
                    {
                      required: [
                        "/confirm/message/order/fulfillments/@ondc/org/awb_no",
                        "/confirm/message/order/fulfillments/@ondc/org/ewaybillno",
                        "/confirm/message/order/fulfillments/@ondc/org/ebnexpirydate",
                      ],
                    },
                  ],
                },
              ],
            },
            {
              properties: {
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      descriptor: {
                        properties: {
                          code: { const: "P2P" },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
      required: ["order"],
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
    init: {
      type: "array",
      items: {
        $ref: "initSchema#",
      },
    },
    on_init: {
      type: "array",
      items: {
        $ref: "onInitSchema#",
      },
    },
    confirm: {
      type: "array",
      items: {
        $ref: "confirmSchema#",
      },
    },
  },
  required: ["context", "message"],
  anyOf: [
    {
      properties: {
        confirm: {
          properties: {
            message: {
              properties: {
                order: {
                  properties: {
                    fulfillments: {
                      items: {
                        properties: {
                          tags: {
                            properties: {
                              "@ondc/org/order_ready_to_ship": {
                                enum: ["No", "no"],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      properties: {
        message: {
          properties: {
            order: {
              properties: {
                fulfillments: {
                  required: ["start", "end"],
                },
              },
            },
          },
        },
      },
    },
  ],
};
