module.exports = {
  $id: "http://example.com/schema/onStatusSchema",
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          const: "ONDC:RET10",
        },
        location: {
          type: "object",
          properties: {
            city: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  const: { $data: "/search/0/context/location/city/code" },
                },
              },
              required: ["code"],
            },
            country: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  const: { $data: "/search/0/context/location/country/code" },
                },
              },
              required: ["code"],
            },
          },
          required: ["city", "country"],
        },
        action: {
          type: "string",
          const: "on_status",
        },
        version: {
          type: "string",
          const: "2.0.1",
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
          const: { $data: "/select/0/context/transaction_id" },
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
        "location",
        "action",
        "version",
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
              const: { $data: "/confirm/0/message/order/id" },
            },
            state: {
              type: "string",
              enum: ["Created", "Accepted", "In-progress","Cancelled","Completed"],
            },
            provider: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  const: { $data: "/select/0/message/order/provider/id" },
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
              required: ["id", "locations"],
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  fulfillment_ids: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  quantity: {
                    type: "object",
                    properties: {
                      selected: {
                        type: "object",
                        properties: {
                          count: {
                            type: "integer",
                          },
                        },
                        required: ["count"],
                      },
                    },
                    required: ["selected"],
                  },
                },
                required: ["id", "fulfillment_ids", "quantity"],
              },
            },
            billing: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                address: {
                  type: "string",
                },
                state: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                  },
                  required: ["name"],
                },
                city: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                  },
                  required: ["name"],
                },
                email: {
                  type: "string",
                },
                phone: {
                  type: "string",
                },
              },
              required: ["name", "address", "state", "city", "phone"],
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  "@ondc/org/provider_name": {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  tracking: {
                    type: "boolean",
                  },
                  state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            enum:["Pending","Agent-assigned","Order-picked-up","Out-for-delivery","Order-delivered"]
                          },
                        },
                        required: ["code"],
                      },
                    },
                    required: ["descriptor"],
                  },
                  stops: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                        },
                        location: {
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
                                images: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                              },
                              required: ["name"],
                            },
                            gps: {
                              type: "string",
                            },
                          },
                          required: ["id", "descriptor", "gps"],
                        },
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
                            timestamp: {
                              type: "string",
                            },
                          },
                          required: ["range"],
                        },
                        instructions: {
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
                            images: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                          required: [
                            "name",
                            "short_desc",
                            "long_desc",
                            "images",
                          ],
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
                        agent: {
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
                            contact: {
                              type: "object",
                              properties: {
                                phone: {
                                  type: "string",
                                },
                              },
                              required: ["phone"],
                            },
                          },
                          required: ["person", "contact"],
                        },
                      },
                      required: [
                        "type",
                        "location",
                        "time",
                        "contact",
                      ],
                    },
                  },
                },
                required: [
                  "id",
                  "@ondc/org/provider_name",
                  "type",
                  "tracking",
                  "state",
                  "stops",
                ],
              },
            },
            quote: {
              type: "object",
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
                      "@ondc/org/item_quantity": {
                        type: "object",
                        properties: {
                          count: {
                            type: "integer",
                          },
                        },
                        required: ["count"],
                      },
                      title: {
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
                      item: {
                        type: "object",
                        properties: {
                          quantity: {
                            type: "object",
                            properties: {
                              available: {
                                type: "object",
                                properties: {
                                  count: {
                                    type: "string",
                                  },
                                },
                                required: ["count"],
                              },
                              maximum: {
                                type: "object",
                                properties: {
                                  count: {
                                    type: "string",
                                  },
                                },
                                required: ["count"],
                              },
                            },
                            required: ["available", "maximum"],
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
                        required: ["quantity", "price"],
                      },
                    },
                    if: {
                      properties: {
                        "@ondc/org/title_type": {
                          const: "item",
                        },
                      },
                    },
                    then: {
                      required: [
                        "@ondc/org/item_id",
                        "@ondc/org/item_quantity",
                        "title",
                        "@ondc/org/title_type",
                        "price",
                        "item",
                      ],
                    },
                    else: {
                      properties: {
                        "@ondc/org/title_type": {
                          enum: [
                            "delivery",
                            "packing",
                            "tax",
                            "discount",
                            "misc",
                          ],
                        },
                      },
                      required: [
                        "@ondc/org/item_id",
                        "title",
                        "@ondc/org/title_type",
                        "price",
                      ],
                    },
                  },
                },
                ttl: {
                  type: "string",
                },
              },
              required: ["price", "breakup", "ttl"],
            },
            payments: {
              type: "array",
              items: [
                {
                  type: "object",
                  properties: {
                    uri: {
                      type: "string",
                    },
                    tl_method: {
                      type: "string",
                    },
                    params: {
                      type: "object",
                      properties: {
                        currency: {
                          type: "string",
                        },
                        transaction_id: {
                          type: "string",
                        },
                        amount: {
                          type: "string",
                        },
                      },
                      required: ["currency", "amount"],
                    },
                    status: {
                      type: "string",
                      enum: ["PAID", "NOT-PAID"],
                    },
                    type: {
                      type: "string",
                      enum: [
                        "PRE-FULFILLMENT",
                        "ON-FULFILLMENT",
                        "POST-FULFILLMENT",
                      ],
                    },
                    collected_by: {
                      type: "string",
                    },
                    "@ondc/org/buyer_app_finder_fee_type": {
                      type: "string",
                    },
                    "@ondc/org/buyer_app_finder_fee_amount": {
                      type: "string",
                    },
                    "@ondc/org/settlement_details": {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          settlement_counterparty: {
                            type: "string",
                          },
                          settlement_phase: {
                            type: "string",
                          },
                          settlement_type: {
                            type: "string",
                            enum: ["upi", "neft", "rtgs"],
                          },
                          beneficiary_name: {
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
                          bank_name: {
                            type: "string",
                          },
                          branch_name: {
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
                              ],
                            },
                          },
                        ],
                        required: ["settlement_counterparty", "settlement_type"],
                      },
                    },
                  },
                  required: [
                    "params",
                    "status",
                    "type",
                    "collected_by",
                    "@ondc/org/buyer_app_finder_fee_type",
                    "@ondc/org/buyer_app_finder_fee_amount",
                  ],
                },
              ],
            },
            documents: {
              type: "array",
              items: [
                {
                  type: "object",
                  properties: {
                    url: {
                      type: "string",
                    },
                    label: {
                      type: "string",
                    },
                  },
                  required: ["url", "label"],
                },
              ],
            },
            created_at: {
              type: "string",
              format: "date-time",
              const: { $data: "/confirm/0/message/order/created_at" },
              errorMessage:
                "order/created_at should remain same as in /confirm - ${/confirm/0/message/order/created_at}",
            },
            updated_at: {
              type: "string",
              format: "date-time",
            },
          },
          required: [
            "id",
            "state",
            "provider",
            "items",
            "billing",
            "fulfillments",
            "quote",
            "payments",
            "documents",
            "created_at",
            "updated_at",
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
    select: {
      type: "array",
      items: {
        $ref: "selectSchema#",
      },
    },
    on_select: {
      type: "array",
      items: {
        $ref: "onSelectSchema#",
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
    on_confirm: {
      type: "array",
      items: {
        $ref: "onConfirmSchema#",
      },
    },
    update: {
      type: "array",
      items: {
        $ref: "updateSchema#",
      },
    },
    on_update: {
      type: "array",
      items: {
        $ref: "onUpdateSchema#",
      },
    },
    status: {
      type: "array",
      items: {
        $ref: "statusSchema#",
      },
    },
  },
  required: ["context", "message"],
};