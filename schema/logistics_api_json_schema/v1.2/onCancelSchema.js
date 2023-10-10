const constants = require("../../../utils/constants");
const { TITLE_TYPE,CANCELLATION_CODE } = require("../../../utils/constants");
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
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  fulfillment_id: {
                    type: "string",
                  },
                  category_id: {
                    type: "string",
                    const: {
                      $data: "/init/0/message/order/items/0/category_id",
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
                required: ["id", "category_id", "descriptor","fulfillment_id"],
              },
            },
            quote: {
              type: "object",
              properties: {
                price: {
                  $ref: "commonSchema#/properties/priceFormat/properties",
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
                        enum: TITLE_TYPE,
                      },
                      price: {
                        $ref: "commonSchema#/properties/priceFormat/properties",
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
                          code: {
                            type: "string",
                            enum: ["Cancelled", "RTO-Initiated"],
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
                    allOf: [
                      {
                        $merge: {
                          source: {
                            $ref: "commonSchema#/properties/addressFormat",
                          },
                          with: {
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
                        },
                      },
                      {
                        $data:
                          "/on_confirm/0/message/order/fulfillments/0/start",
                      },
                    ],
                  },

                  end: {
                    allOf: [
                      {
                        $merge: {
                          source: {
                            $ref: "commonSchema#/properties/addressFormat",
                          },
                          with: {
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
                        },
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
                  tags: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                          const: "rto_event",
                        },
                        list: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              code: {
                                type: "string",
                                enum: constants.CANCELLATION_TAGS_LIST,
                              },
                              value: {
                                type: "string",
                              },
                            },
                            required: ["code", "value"],
                          },
                        },
                      },
                    },
                  },
                },
                additionalProperties: false,
                allOf: [
                  {
                    if: {
                      properties: {
                        type: {
                          const: "RTO",
                        },
                      },
                    },
                    then: {
                      required: ["id", "type", "state", "start"],
                    },
                    else: {
                      required: [
                        "id",
                        "type",
                        "state",
                        "tags",
                        "tracking",
                        "start",
                        "end",
                        "agent",
                      ],
                    },
                  },
                  {
                    if: {
                      properties: {
                        type: {
                          const: "RTO",
                        },
                      },
                    },
                    then: {
                      properties: {
                        start: {
                          required: ["time"],
                        },
                        end: {
                          required: ["time"],
                        },
                      },
                    },
                  },
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
              type: "object",
              properties: {
                "@ondc/org/collection_amount": {
                  type: "string",
                  const: {
                    $data:
                      "/on_confirm/0/message/order/payment/@ondc~1org~1collection_amount",
                  },
                },
                type: {
                  type: "string",
                  const: {
                    $data: "/on_confirm/0/message/order/payment/type",
                  },
                },
                collected_by: {
                  type: "string",
                  const: {
                    $data: "/on_confirm/0/message/order/payment/collected_by",
                  },
                },
                time: {
                  type: "object",
                  properties: {
                    timestamp: {
                      type: "string",
                      format: "date-time",
                    },
                  },
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
                      settlement_status: {
                        type: "string",
                      },
                      settlement_reference: {
                        type: "string",
                      },
                      settlement_timestamp: {
                        type: "string",
                      },
                    },

                    required: ["settlement_counterparty", "settlement_type"],
                  },
                },
              },
              if: { properties: { type: { const: "ON-FULFILLMENT" } } },
              then: {
                properties: {
                  collected_by: {
                    const: "BPP",
                  },
                },
              },
              required: ["type", "collected_by"],
            },
            "@ondc/org/linked_order": {
              allOf: [
                {
                  $ref: "onConfirmSchema#/properties/message/properties/order/properties/@ondc~1org~1linked_order",
                },
                {
                  $data: "/on_confirm/0/message/order/@ondc~1org~1linked_order",
                },
              ],
            },
            created_at: {
              type: "string",
              const: {
                $data: "/confirm/0/message/order/created_at",
              },
              errorMessage: "mismatches in /confirm and /on_cancel",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
          },
          isFutureDated: true,
          errorMessage: "created_at/updated_at must not be future dated",
          additionalProperties: false,
          required: [
            "id",
            "state",
            "provider",
            "fulfillments",
            "billing",
            "payment",
            "@ondc/org/linked_order",
            "created_at",
            "updated_at",
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};
