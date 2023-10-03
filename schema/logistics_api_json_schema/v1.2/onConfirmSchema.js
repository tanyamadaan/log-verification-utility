const constants = require("../../../utils/constants");
module.exports = {
  $id: "http://example.com/schema/onConfirmSchema/v1.2",
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
              "/on_search/0/context/city",
          },
        },
        action: {
          type: "string",
          const: "on_confirm",
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
                  "/confirm/0/context/message_id",
              },
              errorMessage:
                "Message ID for on_action API should be same as action API: ${/confirm/0/context/message_id}",
            },
            {
              not: {
                const: { $data: "1/transaction_id" },
              },
              errorMessage:
                "Message ID should not be equal to transaction_id: ${1/transaction_id}",
            },
            {
              not: {
                const: {
                  $data:
                    "/init/0/context/message_id",
                },
              },
              errorMessage: "Message ID should be unique",
            },
            {
              not: {
                const: {
                  $data:
                    "/search/0/context/message_id",
                },
              },
              errorMessage: "Message ID should be unique",
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
              enum: ["Created", "Accepted", "Cancelled"],
            },
            provider: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  const: {
                    $data:
                      "/on_cancel/0/message/order/provider/id",
                  },
                },
                locations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        const: {
                          $data:
                            "/init/0/message/order/provider/locations/0/id",
                        },
                      },
                    },
                    required: ["id"],
                  },
                },
              },
              required: ["id"],
              // oneOf: [
              //   {
              //     required: [
              //       "/confirm/0/message/order/provider/locations",
              //       "locations",
              //     ],
              //   },
              //   {
              //     not: {
              //       required: [
              //         "/confirm/0/message/order/provider/locations",
              //         "locations",
              //       ],
              //     },
              //   },
              // ],
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    const: {
                      $data:
                        "/init/0/message/order/items/0/id",
                    },
                  },
                  fulfillment_id: {
                    type: "string",
                    const: {
                      $data:
                        "/init/0/message/order/items/0/fulfillment_id",
                    },
                  },
                  category_id: {
                    type: "string",
                    const: {
                      $data:
                        "/init/0/message/order/items/0/category_id",
                    },
                  },
                  descriptor: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        const: {
                          $data:
                            "/init/0/message/order/items/0/descriptor/code",
                        },
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
              const: {
                $data:
                  "/confirm/0/message/order/quote",
              },
              errorMessage: "object mismatches in /confirm and /on_confirm.",
              properties: {
                price: {
                  allOf: [
                    {
                      $ref: "http://example.com/schema/commonSchema/v1.2#/properties/priceFormat",
                    },
                    {
                      $data:
                        "/confirm/0/message/order/quote/price",
                    },
                  ],
                },
                breakup: {
                  allOf: [
                    {
                      $ref: "http://example.com/schema/confirmSchema/v1.2#/properties/message/properties/order/properties/quote/properties/breakup",
                    },
                    {
                      $data:
                        "/confirm/0/message/order/quote/breakup",
                    },
                  ],
                  // type: "array",
                  // items: {
                  //   type: "object",
                  //   properties: {
                  //     "@ondc/org/item_id": {
                  //       type: "string",
                  //     },
                  //     "@ondc/org/title_type": {
                  //       type: "string",
                  //       enum: constants.FULFILLMENT_TYPE,
                  //     },
                  //     price: {
                  //       type: "object",
                  //       properties: {
                  //         currency: {
                  //           type: "string",
                  //           const: "INR",
                  //         },
                  //         value: {
                  //           type: "string",
                  //         },
                  //       },
                  //       required: ["currency", "value"],
                  //     },
                  //   },
                  //   required: [
                  //     "@ondc/org/item_id",
                  //     "@ondc/org/title_type",
                  //     "price",
                  //   ],
                  // },
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
                      $data:
                        "/confirm/0/message/order/fulfillments/0/id",
                    },
                  },
                  type: {
                    type: "string",
                    const: {
                      $data:
                        "/confirm/0/message/order/fulfillments/0/type",
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
                  },
                  tracking: {
                    type: "boolean",
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
                                    format: "date-time",
                                  },
                                  end: {
                                    type: "string",
                                    format: "date-time",
                                  },
                                },
                                required: ["start", "end"],
                              },
                            },
                            required: ["range"],
                          },
                          instructions: {
                            type: "object",
                            properties: {
                              code: {
                                type: "string",
                              },
                              short_desc: {
                                type: "string",
                              },
                              long_desc: {
                                type: "string",
                              },
                            },
                          },
                        },
                        required: ["time", "instructions"],
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
                          instructions: {
                            type: "object",
                            properties: {
                              code: {
                                type: "string",
                              },
                              short_desc: {
                                type: "string",
                              },
                              long_desc: {
                                type: "string",
                              },
                            },
                          },
                        },
                        required: ["time", "instructions"],
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
                  vehicle: {
                    type: "object",
                    properties: {
                      registration: {
                        type: "string",
                      },
                    },
                    required: ["category", "size", "registration"],
                  },
                },
                required: ["id", "type", "state", "tracking"],
              },
            },
            tags: {
              $ref: "http://example.com/schema/commonSchema/v1.2#/properties/tagsArray",
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
                        "mismatches in /billing in /confirm and /on_confirm",
                    },
                    building: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/building",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_confirm",
                    },
                    locality: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/locality",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_confirm",
                    },
                    city: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/city",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_confirm",
                    },
                    state: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/state",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_confirm",
                    },
                    country: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/country",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_confirm",
                    },
                    area_code: {
                      type: "string",
                      const: {
                        $data:
                          "/confirm/0/message/order/billing/address/area code",
                      },
                      errorMessage:
                        "mismatches in /billing in /confirm and /on_confirm",
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
                    "mismatches in /billing in /confirm and /on_confirm",
                },
                phone: {
                  type: "string",
                  const: {
                    $data:
                      "/confirm/0/message/order/billing/phone",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_confirm",
                },
                email: {
                  type: "string",
                  const: {
                    $data:
                      "/confirm/0/message/order/billing/email",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_confirm",
                },
                created_at: {
                  type: "string",
                  const: {
                    $data:
                      "/confirm/0/message/order/billing/created_at",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_confirm",
                },
                updated_at: {
                  type: "string",
                  const: {
                    $data:
                      "/confirm/0/message/order/billing/updated_at",
                  },
                  errorMessage:
                    "mismatches in /billing in /confirm and /on_confirm",
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
              errorMessage: "mismatches in /confirm and /on_confirm",
            },
            updated_at: {
              type: "string",
              const: { $data: "3/context/timestamp" },
              errorMessage:
                "does not match context/timestamp - ${3/context/timestamp}",
            },
          },
          additionalProperties: false,
          required: [
            "id",
            "state",
            "provider",
            "items",
            "quote",
            "fulfillments",
            "created_at",
            "updated_at",
            "@ondc/org/linked_order",
            "payment",
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};
