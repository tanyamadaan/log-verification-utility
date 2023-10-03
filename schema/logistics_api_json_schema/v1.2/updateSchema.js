const constants = require("../../../utils/constants");
module.exports = {
  $id: "http://example.com/schema/updateSchema/v1.2",
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
              "/on_search/0/context/properties/city",
          },
        },
        action: {
          type: "string",
          const: "update",
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
        update_target: {
          type: "string",
        },
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
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    const: {
                      $data:
                        "/confirm/0/message/order/items/0/id",
                    },
                  },
                  category_id: {
                    type: "string",
                    const: {
                      $data:
                        "/confirm/0/message/order/items/0/category_id",
                    },
                  },
                  descriptor: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        const: {
                          $data:
                            "/confirm/0/message/order/items/0/descriptor/code",
                        },
                      },
                    },
                    required: ["code"],
                  },
                },
                required: ["id", "category_id", "descriptor"],
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
                  "@ondc/org/awb_no": {
                    type: "string",
                  },
                  start: {
                    type: "object",
                    properties: {
                      instructions: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            enum: constants.PCC,
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
                      },
                    },
                    additionalProperties: false,
                    // required: ["instructions"],
                  },
                  end: {
                    type: "object",
                    properties: {
                      instructions: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            enum: constants.DCC,
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
                        required: ["name", "code", "short_desc", "long_desc"],
                      },
                    },
                    additionalProperties: false,
                    // required: ["instructions"],
                  },
                  tags: {
                    $ref: "http://example.com/schema/commonSchema/v1.2#/properties/tagsArray",
                  },
                },
                additionalProperties: false,
                required: ["id", "type", "tags"],

                // if: {
                //   properties: {
                //     tags: {
                //       properties: {
                //         "@ondc/org/order_ready_to_shiporder_ready_to_ship": { const: "yes" },
                //       },
                //     },
                //   },
                // },
                // then: {
                //   required: ["0/start/instructions"],
                //   errorMessage:
                //     "start/instructions are required when ready_to_ship = yes",
                // },

                // if: {
                //   properties: {
                //     tags: {
                //       properties: {
                //         "@ondc/org/order_ready_to_ship": { const: "yes" },
                //       },
                //     },
                //   },
                // },
                // then: {
                //   required: [
                //     "/on_update/message/order/fulfillments/0/start/time/range",
                //     "/on_update/message/order/fulfillments/0/end/time/range",
                //   ],
                //   errorMessage:
                //     "start and end time range is required when ready_to_ship=yes",
                // },

                // anyOf: [
                //   {
                //     properties: {
                //       start: {
                //         properties: {
                //           instructions: {
                //             required: ["short_desc"],
                //           },
                //         },
                //       },
                //       tags: {
                //         properties: {
                //           "@ondc/org/order_ready_to_ship": {
                //             enum: ["yes"],
                //           },
                //         },
                //       },
                //     },
                //     required: ["start"],
                //   },
                //   {
                //     properties: {
                //       tags: {
                //         properties: {
                //           "@ondc/org/order_ready_to_ship": {
                //             enum: ["no"],
                //           },
                //         },
                //       },
                //     },
                //   },
                // ],
              },
            },
            "@ondc/org/linked_order": {
              $ref: "http://example.com/schema/confirmSchema/v1.2#/properties/message/order/~0ondc~1org~1linked_order",
            },
          },
          required: ["id", "state", "items", "fulfillments", "updated_at"],
        },
      },
      required: ["update_target", "order"],
    },
  },
  required: ["context", "message"],
};
