const { CANCELLATION_CODE } = require("../../../utils/constants");
module.exports = {
  $id: "http://example.com/schema/onCancelSchema",
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
        },
        action: {
          type: "string",
          const: "on_cancel",
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
          const: { $data: "/search/0/context/transaction_id" },
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
            {
              const: { $data: "/cancel/0/context/message_id" },
              errorMessage:
                "Message ID should be same as /cancel: ${/cancel/0/context/message_id}",
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
                $data: "/on_confirm/0/message/order/id",
              },
            },
            state: {
              type: "string",
              enum: ["Cancelled"],
            },
            cancellation: {
              type: "object",
              properties: {
                cancelled_by: { type: "string" },
                reason: {
                  type: "object",
                  properties: {
                    id: { type: "string", enum: CANCELLATION_CODE },
                  },
                },
              },
            },
            items: {
              allOf: [
                {
                  $ref: "onConfirmSchema#/properties/message/properties/order/properties/items",
                },
                {
                  $data: "/on_confirm/0/message/items",
                },
              ],
            },
            quote: {
              allOf: [
                {
                  $ref: "onConfirmSchema#/properties/message/properties/order/properties/quote",
                },
                {
                  $data: "/on_confirm/0/message/quote",
                },
              ],
            },

            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    $data: "/on_confirm/0/message/order/fulfillments/0/id",
                  },
                  type: {
                    type: "string",
                    $data: "/on_confirm/0/message/order/fulfillments/0/type",
                  },
                  state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            enum: ["Cancelled"],
                          },
                        },
                        required: ["code"],
                      },
                    },
                    required: ["descriptor"],
                  },
                  "@ondc/org/awb_no": {
                    type: "string",
                    const: {
                      $data:
                        "/on_confirm/0/message/order/fulfillments/0/@ondc~1org~1awb_no",
                    },
                  },
                  tracking: {
                    type: "boolean",
                    const: {
                      $data:
                        "/on_confirm/0/message/order/fulfillments/0/tracking",
                    },
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
                        $ref: "commonSchema#/properties/addressFormat",
                      },
                      {
                        $data:
                          "/on_confirm/0/message/order/fulfillments/0/start",
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
                        $ref: "commonSchema#/properties/addressFormat",
                      },
                      {
                        $data: "/on_confirm/0/message/order/fulfillments/0/end",
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
                    required: ["registration"],
                  },
                },
                additionalProperties: false,
                required: [
                  "id",
                  "type",
                  "state",
                  "tags",
                  "@ondc/org/awb_no",
                  "tracking",
                  "start",
                  "end",
                  "agent",
                ],
              },
            },
            billing: {
              allOf: [
                {
                  $ref: "onConfirmSchema#/properties/message/properties/order/properties/billing",
                },
                {
                  $data: "/on_confirm/0/message/order/billing",
                },
              ],
            },
            payment: {
              // allOf: [
              //   {
              //     $ref: "/onConfirmSchema#/properties/message/properties/order/properties/payment",
              //   },
              //   {
              //     $data: "/on_confirm/0/message/order/payment",
              //   },
              // ],
            },
            "@ondc/org/linked_order": {
              allOf: [
                {
                  $ref: "onConfirmSchema#/properties/message/properties/order/properties/@ondc~1org~1linked_order",
                },
                {
                  $data:
                    "/on_confirm/0/message/order/@ondc~1org~1linked_order",
                },
              ],
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
          },
          additionalProperties: false,
          required: [
            "id",
            "state",
            "fulfillments",
            "billing",
            "payment",
            "@ondc/org/linked_order",
            "updated_at",
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};
