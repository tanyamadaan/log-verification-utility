module.exports = {
  $id: "http://example.com/schema/initSchema",
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
          const: "init",
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
                    // const: {$data: "/on_search/message/catalog/bpp~1providers/0/items/0/id"},
                    // errorMessage: "${/on_search/message/catalog/bpp~1providers/0/items/0/id}"
                  },
                  category_id: {
                    type: "string",
                    // const: {$data: "/on_search/message/catalog/bpp~1providers/0/items/0/category_id"},
                    // errorMessage: "${/on_search/message/catalog/bpp~1providers/0/items/0/category_id}"
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
                    enum: ["CoD", "Prepaid"],
                  },
                  start: {
                    type: "object",
                    properties: {
                      location: {
                        type: "object",
                        properties: {
                          gps: {
                            type: "string",
                            const: {$data: "/search/0/message/intent/fulfillment/start/location/gps"},
                            errorMessage: "Start location does not match location in search"
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
                        required: ["phone"],
                      },
                    },
                    required: ["location", "contact"],
                  },
                  end: {
                    type: "object",
                    properties: {
                      location: {
                        type: "object",
                        properties: {
                          gps: {
                            type: "string",
                            const: {$data: "/search/0/message/intent/fulfillment/end/location/gps"},
                            errorMessage: "End location does not match location in search"
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
                    },
                    required: ["location", "contact"],
                  },
                },
                required: ["id", "type", "start", "end"],
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
                  const: { $data: "4/context/timestamp" },
                  errorMessage:
                    "created_at - ${4/context/timestamp} does not match context timestamp",
                },
                updated_at: {
                  type: "string",
                  const: { $data: "4/context/timestamp" },
                  errorMessage:
                    "updated_at - ${4/context/timestamp} does not match context timestamp",
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
                    required: [
                      "settlement_counterparty",
                      "settlement_type",
                      "beneficiary_name",
                    ],
                  },
                },
              },
              required: ["@ondc/org/settlement_details"],
            },
          },
          required: ["provider", "items", "fulfillments", "billing"],
          oneOf: [
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
        message: {
          properties: {
            catalog: {
              properties: {
                "bpp/fulfillments": {
                  items: {
                    properties: {
                      type: {
                        enum: ["CoD", "Prepaid"],
                        const: { $data: "/message/order/fulfillments/0/type" },
                      },
                      id: {
                        const: { $data: "/message/order/fulfillments/0/id" },
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
  required: ["context", "message"],
};
