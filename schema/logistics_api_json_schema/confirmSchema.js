module.exports = {
  $id: "http://example.com/schema/confirmSchema",
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
          const: "confirm",
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
          const: { $data: "/on_init/context/transaction_id" },
        },
        message_id: {
          type: "string",
        },
        timestamp: {
          type: "string",
          format: "date-time",
        },
        ttl: {
          type: "string",
          const: "PT30S",
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
        "ttl",
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
              const: "Created",
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
                  },
                },
              },
              required: ["id"],
              oneOf: [
                {
                  required: [
                    "/on_search/message/catalog/bpp~1providers/0/locations",
                    "locations",
                  ],
                },
                {
                  not: {
                    required: [
                      "/on_search/message/catalog/bpp~1providers/0/locations",
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
                        const: {
                          $data:
                            "/on_search/message/catalog/bpp~1providers/0/items/0/descriptor/code",
                        },
                      },
                    },
                    required: ["code"],
                  },
                },
                required: ["id", "category_id", "descriptor"],
                anyOf: [
                  {
                    allOf: [
                      {
                        properties: {
                          id: {
                            const: {
                              $data:
                                "/on_search/message/catalog/bpp~1providers/0/items/0/id",
                            },
                          },
                        },
                      },
                      {
                        properties: {
                          category_id: {
                            const: {
                              $data:
                                "/on_search/message/catalog/bpp~1providers/0/items/0/category_id",
                            },
                          },
                        },
                      },
                    ],
                  },
                  {
                    allOf: [
                      {
                        properties: {
                          id: {
                            const: {
                              $data:
                                "/on_search/message/catalog/bpp~1providers/1/items/0/id",
                            },
                          },
                        },
                      },
                      {
                        properties: {
                          category_id: {
                            const: {
                              $data:
                                "/on_search/message/catalog/bpp~1providers/1/items/0/category_id",
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            quote: {
              type: "object",
              const: { $data: "/on_init/message/order/quote" },
              errorMessage: "Quote object mismatches in /init and /confirm.",
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
                        const: { $data: "/on_init/message/order/items/0/id" },
                      },
                      "@ondc/org/title_type": {
                        type: "string",
                        enum: ["Delivery Charge", "Tax"],
                        errorMessage:
                          "breakup should not include ${1/@ondc~1org~1title_type}",
                      },
                      price: {
                        type: "object",
                        properties: {
                          currency: {
                            type: "string",
                            const: "INR",
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
                    const: { $data: "/init/message/order/fulfillments/0/id" },
                  },
                  type: {
                    type: "string",
                    const: { $data: "/init/message/order/fulfillments/0/type" },
                  },
                  "@ondc/org/awb_no": {
                    type: "string",
                    minLength: 11,
                    maxLength: 16,
                  },
                  start: {
                    type: "object",
                    properties: {
                      person: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                        },
                        required: ["name"],
                      },
                      location: {
                        type: "object",
                        properties: {
                          gps: {
                            type: "string",
                          },
                          address: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                minLength: 3,
                                not: { const: { $data: "1/locality" } },
                              },
                              building: {
                                type: "string",
                                minLength: 3,
                              },
                              locality: {
                                type: "string",
                                minLength: 3,
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
                        },
                        required: ["gps", "address"],
                      },
                      contact: {
                        type: "object",
                        properties: {
                          phone: {
                            type: "string",
                          },
                          email: {
                            type: "string",
                          },
                        },
                        required: ["phone", "email"],
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          short_desc: {
                            type: "string",
                          },
                          long_desc: {
                            type: "string",
                          },
                          images: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                        //required: ["long_desc", "images"],
                      },
                    },
                    required: ["person", "location", "contact"],
                  },
                  end: {
                    type: "object",
                    properties: {
                      person: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                        },
                        required: ["name"],
                      },
                      location: {
                        type: "object",
                        properties: {
                          gps: {
                            type: "string",
                          },
                          address: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                minLength: 3,
                                not: { const: { $data: "1/locality" } },
                                errorMessage:
                                  "name + building + locality < 190 chars & each of name / building / locality > 3 chars; name != locality",
                              },
                              building: {
                                type: "string",
                                minLength: 3,
                              },
                              locality: {
                                type: "string",
                                minLength: 3,
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
                        },
                        required: ["gps", "address"],
                      },
                      contact: {
                        type: "object",
                        properties: {
                          phone: {
                            type: "string",
                          },
                          email: {
                            type: "string",
                          },
                        },
                        required: ["phone"],
                      },
                      instructions: {
                        type: "object",
                        properties: {
                          short_desc: {
                            type: "string",
                          },
                          long_desc: {
                            type: "string",
                          },
                          additional_desc: {
                            type: "object",
                            properties: {
                              content_type: {
                                type: "string",
                              },
                              url: {
                                type: "string",
                              },
                            },
                            required: ["content_type", "url"],
                          },
                        },
                        // required: [
                        //   "long_desc",
                        //   "additional_desc",
                        // ],
                      },
                    },
                    required: ["person", "location", "contact"],
                  },
                  "@ondc/org/ewaybillno": {
                    type: "string",
                  },
                  "@ondc/org/ebnexpirydate": {
                    type: "string",
                    format: "date-time",
                  },
                  tags: {
                    type: "object",
                    properties: {
                      "@ondc/org/order_ready_to_ship": {
                        type: "string",
                        enum: ["yes", "no", "Yes", "No"],
                      },
                    },
                    required: ["@ondc/org/order_ready_to_ship"],
                  },
                },
                required: ["id", "type", "start", "end", "tags"],
                anyOf: [
                  {
                    properties: {
                      start: {
                        properties: {
                          instructions: {
                            required: ["short_desc"],
                            errorMessage: "PCC required when RTS is Yes",
                          },
                        },
                        required: ["instructions"],
                        errorMessage: "instructions required when RTS is Yes",
                      },
                      tags: {
                        properties: {
                          "@ondc/org/order_ready_to_ship": {
                            enum: ["yes", "Yes"],
                          },
                        },
                      },
                    },
                    required: ["start", "end"],
                  },
                  {
                    properties: {
                      tags: {
                        properties: {
                          "@ondc/org/order_ready_to_ship": {
                            enum: ["no", "No"],
                            errorMessage:
                              "Fulfillment object should include start instructions if ready_to_ship is Yes",
                          },
                        },
                      },
                    },
                  },
                ],
                errorMessage:
                  "Fulfillment object should include start instructions if ready_to_ship is Yes",
              },
            },
            billing: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                address: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      minLength: 3,
                      not: { const: { $data: "1/locality" } },
                    },
                    building: {
                      type: "string",
                      minLength: 3,
                    },
                    locality: {
                      type: "string",
                      minLength: 3,
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
            payment: {
              type: "object",
              properties: {
                "@ondc/org/collection_amount": {
                  type: "string",
                },
                collected_by: {
                  type: "string",
                },
                type: {
                  type: "string",
                  enum: ["ON-FULFILLMENT", "POST-FULFILLMENT", "ON-ORDER"],
                },
                "@ondc/org/settlement_details": {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      settlement_counterparty: {
                        type: "string",
                      },
                      settlement_type: {
                        type: "string",
                      },
                      upi_address: {
                        type: "string",
                      },
                      settlement_bank_account_no: {
                        type: "string",
                      },
                      settlement_ifsc_code: {
                        type: "string",
                      },
                    },
                    allOf: [
                      {
                        if: {
                          properties: {
                            settlement_type: {
                              const: "upi",
                            },
                          },
                        },
                        then: {
                          required: ["upi_address"],
                        },
                      },
                      {
                        if: {
                          properties: {
                            settlement_type: {
                              const: ["neft", "rtgs"],
                            },
                          },
                        },
                        then: {
                          required: [
                            "settlement_ifsc_code",
                            "settlement_bank_account_no",
                            "bank_name",
                            "branch_name",
                          ],
                        },
                      },
                    ],
                    required: ["settlement_counterparty", "settlement_type"],
                  },
                },
              },
              required: [
                "collected_by",
                "type",
                "@ondc/org/settlement_details",
              ],
            },
            "@ondc/org/linked_order": {
              type: "object",
              properties: {
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      category_id: {
                        type: "string",
                        enum: [
                          "Grocery",
                          "F&B",
                          "Fashion",
                          "BPC",
                          "Electronics",
                          "Home & Decor",
                          "Pharma",
                          "Agriculture",
                          "Mobility",
                        ],
                      },
                      descriptor: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                        },
                        required: ["name"],
                      },
                      quantity: {
                        type: "object",
                        properties: {
                          count: {
                            type: "integer",
                          },
                          measure: {
                            type: "object",
                            properties: {
                              unit: {
                                type: "string",
                              },
                              value: {
                                type: "number",
                              },
                            },
                            required: ["unit", "value"],
                          },
                        },
                        required: ["count", "measure"],
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
                      "category_id",
                      "descriptor",
                      "quantity",
                      "price",
                    ],
                  },
                },
                provider: {
                  type: "object",
                  properties: {
                    descriptor: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                      },
                      required: ["name"],
                    },
                    address: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        street: {
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
                        area_code: {
                          type: "string",
                        },
                      },
                      required: [
                        "name",
                        "street",
                        "locality",
                        "city",
                        "state",
                        "area_code",
                      ],
                    },
                  },
                  required: ["descriptor", "address"],
                },
                order: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    weight: {
                      type: "object",
                      properties: {
                        unit: {
                          type: "string",
                        },
                        value: {
                          type: "number",
                        },
                      },
                      required: ["unit", "value"],
                    },
                  },
                  required: ["id", "weight"],
                },
              },
              required: ["items", "provider", "order"],
            },
            created_at: {
              type: "string",
              const: { $data: "3/context/timestamp" },
              errorMessage:
                "created_at does not match context timestamp - ${3/context/timestamp}",
            },
            updated_at: {
              type: "string",
              const: { $data: "3/context/timestamp" },
              errorMessage:
                "updated_at does not match context timestamp - ${3/context/timestamp}",
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
            "payment",
            "@ondc/org/linked_order",
            "created_at",
            "updated_at",
          ],
          // oneOf: [
          //   {
          //     allOf: [
          //       {
          //         properties: {
          //           items: {
          //             type: "array",
          //             items: {
          //               type: "object",
          //               properties: {
          //                 descriptor: {
          //                   properties: {
          //                     code: {const: "P2H2P"}
          //                   }
          //                 }
          //               }
          //             }
          //           }
          //         }
          //       },
          //       {
          //         properties: {
          //           fulfillments: {
          //             required: ["@ondc/org/awb_no", "@ondc/org/ewaybillno", "@ondc/org/ebnexpirydate"],
          //             errorMessage: "@ondc/org/awb_no, @ondc/org/ewaybillno, @ondc/org/ebnexpirydate required if Fulfilklment is P2H2P"
          //           }
          //         }
          //       }
          //     ]
          //   },
          //   {
          //     properties: {
          //       items: {
          //         type: "array",
          //         items: {
          //           type: "object",
          //           properties: {
          //             descriptor: {
          //               properties: {
          //                 code: {const: "P2P"}
          //               }
          //             }
          //           }
          //         }
          //       }
          //     }
          //   }
          // ],
          anyOf: [
            {
              properties: {
                fulfillment: {
                  type: "object",
                  properties: {
                    type: {
                      const: "CoD",
                    },
                  },
                },
                payment: {
                  type: "object",
                  properties: {
                    "@ondc/org/collection_amount": {
                      type: "string",
                    },
                  },
                  required: ["@ondc/org/collection_amount"],
                },
              },
              required: ["payment"],
            },
            {
              properties: {
                fulfillment: {
                  type: "object",
                  properties: {
                    type: {
                      enum: ["Prepaid", "Reverse QC"],
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
  },
  required: ["context", "message"],
};
