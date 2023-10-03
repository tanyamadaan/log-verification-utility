const { ORDER_STATE, TITLE_TYPE } = require("../../../utils/constants");
module.exports = {
  $id: "http://example.com/schema/onUpdateSchema/v1.2",
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
          const: {
            $data:
              "/confirm/0/context/city",
          },
        },
        action: {
          type: "string",
          const: "on_update",
        },
        core_version: {
          type: "string",
          const: "1.2.0",
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
          const: {
            $data:
              "/search/0/context/transaction_id",
          },
          errorMessage:
            "Transaction ID should be same across the transaction: ${/search/0/context/transaction_id}",
        },
        message_id: {
          type: "string",
          allOf: [
            {
              const: {
                $data:
                  "/update/0/context/message_id",
              },
              errorMessage:
                "Message ID should be same as /update: ${/update/0/context/message_id}",
            },
            {
              not: {
                const: { $data: "1/transaction_id" },
              },
              errorMessage:
                "Message ID should not be equal to transaction_id: ${1/transaction_id}",
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
              const: {
                $data:
                  "/confirm/0/message/order/id",
              },
            },
            state: {
              type: "string",
              enum: ORDER_STATE,
            },
            provider: {
              type: "object",
              properties: {
                id: { type: "string" },
                locations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                    },
                  },
                },
              },
              required: ["id"],
              if: {
                $ref: "http://example.com/schema/confirmSchema/v1.2#/properties/message/properties/order/properties/provider/properties/locations",
              },
              then: {
                required: ["locations"],
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
                  fulfillment_id: { type: "string" },
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
                  },
                },
                required: ["id", "fulfillment_id", "category_id", "descriptor"],
              },
            },
            quote: {
              type: "object",
              properties: {
                price: {
                  $ref: "http://example.com/schema/commonSchema/v1.2#/properties/priceFormat",
                },
                breakup: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      "@ondc/org/item_id": { type: "string" },
                      "@ondc/org/title_type": {
                        type: "string",
                        enum: TITLE_TYPE,
                      },
                      price: {
                        $ref: "http://example.com/schema/commonSchema/v1.2#/properties/priceFormat",
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
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: { type: "string" },
                        },
                      },
                    },
                  },
                  "@ondc/org/awb_no": {
                    type: "string",
                  },
                  start: {
                    type: "object",
                    allOf: [
                      {
                        properties: {
                          time: {
                            type: "object",
                            properties: {
                              range: {
                                type: "object",
                                properties: {
                                  start: {
                                    type: "string",
                                    minimum: { $data: "7/context/timestamp" },
                                    errorMessage: "${7/context/timestamp}",
                                  },
                                  end: {
                                    type: "string",
                                  },
                                },
                                required: ["start", "end"],
                              },
                              timestamp: {
                                type: "string",
                                format: "date-time",
                              },
                            },
                            required: ["range", "timestamp"],
                          },
                          instructions: {
                            type: "object",
                            properties: {
                              code: { type: "string" },
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
                            required: ["code", "short_desc", "image"],
                          },
                        },
                      },
                      {
                        $ref: "http://example.com/schema/commonSchema/v1.2#/properties/addressFormat",
                      },
                    ],
                  },
                  end: {
                    type: "object",
                    allOf: [
                      {
                        properties: {
                          time: {
                            type: "object",
                            properties: {
                              range: {
                                type: "object",
                                properties: {
                                  start: {
                                    type: "string",
                                    minimum: { $data: "7/context/timestamp" },
                                    errorMessage: "${7/context/timestamp}",
                                  },
                                  end: {
                                    type: "string",
                                  },
                                },
                                required: ["start", "end"],
                              },
                              timestamp: {
                                type: "string",
                                format: "date-time",
                              },
                            },
                            required: ["range", "timestamp"],
                          },
                          instructions: {
                            type: "object",
                            properties: {
                              code: { type: "string" },
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
                            required: ["code", "short_desc", "image"],
                          },
                        },
                      },
                      {
                        $ref: "http://example.com/schema/commonSchema/v1.2#/properties/addressFormat",
                      },
                    ],
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
                  "@ondc/org/ewaybillno": {
                    type: "string",
                    const: {
                      $data:
                        "/on_confirm/0/message/order/fulfillments/0/@ondc~1org~1ewaybillno",
                    },
                  },
                  "@ondc/org/ebnexpirydate": {
                    type: "string",
                    format: "date-time",
                    const: {
                      $data:
                        "/on_confirm/0/message/order/fulfillments/0/@ondc~1org~1ebnexpirydate",
                    },
                  },
                },
                additionalProperties: false,
                required: ["id", "type", "start"],
              },
            },
            billing: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  const: {
                    $data:
                      "/confirm/0/message/order/billing/name",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_confirm",
                },
                address: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      not: { const: { $data: "1/locality" } },
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/name",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_update",
                    },
                    building: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/building",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_update",
                    },
                    locality: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/locality",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_update",
                    },
                    city: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/city",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_update",
                    },
                    state: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/state",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_update",
                    },
                    country: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/country",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_update",
                    },
                    area_code: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/area code",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_update",
                    },
                  },
                  additionalProperties: false,
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
                  const: {
                    $data:
                      "/confirm/0/message/order/billing/tax_number",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_update",
                },
                phone: {
                  type: "string",
                  const: {
                    $data:
                      "/confirm/0/message/order/billing/phone",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_update",
                },
                email: {
                  type: "string",
                  const: {
                    $data:
                      "/confirm/0/message/order/billing/email",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_update",
                },
                created_at: {
                  type: "string",
                  const: {
                    $data:
                      "/confirm/0/message/order/billing/created_at",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_update",
                },
                updated_at: {
                  type: "string",
                  const: {
                    $data:
                      "/confirm/0/message/order/billing/updated_at",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_update",
                },
              },
              additionalProperties: false,
              required: [
                "name",
                "address",
                "phone",
                "tax_number",
                "created_at",
                "updated_at",
              ],
            },
            payment: {
              allOf: [
                {
                  $ref: "http://example.com/schema/confirmSchema/v1.2#/properties/message/properties/order/properties/payment",
                },
                {
                  $data:
                    "/confirm/0/message/order/payment",
                },
              ],
            },
            "@ondc/org/linked_order": {
              allOf: [
                {
                  $ref: "http://example.com/schema/confirmSchema/v1.2#/properties/message/properties/order/properties/@ondc~1org~1linked_order",
                },
                {
                  $data:
                    "/confirm/0/message/order/@ondc~1org~1linked_order",
                },
              ],
            },
            created_at: {
              type: "string",
              const: {
                $data:
                  "/confirm/0/message/order/created_at",
              },
              errorMessage: "mismatches in /confirm and /on_update",
            },
            updated_at: {
              type: "string",
            },
          },
          additionalProperties: false,
          required: [
            "id",
            "state",
            "items",
            "fulfillments",
            "updated_at",
            "@ondc/org/linked_order",
            "payment",
            "billing",
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
          //                     code: { const: "P2H2P" },
          //                   },
          //                 },
          //               },
          //             },
          //           },
          //         },
          //       },
          //       {
          //         properties: {
          //           fulfillments: {
          //             required: [
          //               "@ondc/org/awb_no",
          //               "start/instructions/images",
          //             ],
          //           },
          //         },
          //       }
          //     ],
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
          //                 code: { const: "P2P" },
          //               },
          //             },
          //           },
          //         },
          //       },
          //     },
          //   },
          // ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};
