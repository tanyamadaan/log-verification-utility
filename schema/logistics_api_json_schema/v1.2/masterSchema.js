module.exports = {
  $id: "http://example.com/schema/masterSchema/v1.2",
  type: "object",
  properties: {
    search: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/searchSchema/v1.2#",
      },
    },
    on_search: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/onSearchSchema/v1.2#",
      },
    },
    init: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/initSchema/v1.2#",
      },
    },
    on_init: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/onInitSchema/v1.2#",
      },
    },
    confirm: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/confirmSchema/v1.2#",
      },
    },
    on_confirm: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/onConfirmSchema/v1.2#",
      },
    },
    update: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/updateSchema/v1.2#",
      },
    },
    on_update: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/onUpdateSchema/v1.2#",
      },
    },
    status: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/statusSchema/v1.2#",
      },
    },

    on_status: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/onStatusSchema/v1.2#",
      },
    },
    support: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/supportSchema/v1.2#",
      },
    },
    on_support: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/onSupportSchema/v1.2#",
      },
    },
    track: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/trackSchema/v1.2#",
      },
    },
    on_track: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/onTrackSchema/v1.2#",
      },
    },
    cancel: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/cancelSchema/v1.2#",
      },
    },
    on_cancel: {
      type: "array",
      items: {
        $ref: "http://example.com/schema/onCancelSchema/v1.2#",
      },
    },
  },
};
