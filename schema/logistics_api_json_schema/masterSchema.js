module.exports = {
  $id: "http://example.com/schema/masterSchema",
  type: "object",
  properties: {
    search: {
      type: "array",
      items: {
        $ref: "searchSchema/v1.1#",
      },
    },
    on_search: {
      type: "array",
      items: {
        $ref: "onSearchSchema/v1.1#",
      },
    },
    init: {
      type: "array",
      items: {
        $ref: "initSchema/v1.1#",
      },
    },
    on_init: {
      type: "array",
      items: {
        $ref: "onInitSchema/v1.1#",
      },
    },
    confirm: {
      type: "array",
      items: {
        $ref: "confirmSchema/v1.1#",
      },
    },
    on_confirm: {
      type: "array",
      items: {
        $ref: "onConfirmSchema/v1.1#",
      },
    },
    update: {
      type: "array",
      items: {
        $ref: "updateSchema/v1.1#",
      },
    },
    on_update: {
      type: "array",
      items: {
        $ref: "onUpdateSchema/v1.1#",
      },
    },
    status: {
      type: "array",
      items: {
        $ref: "statusSchema/v1.1#",
      },
    },

    on_status: {
      type: "array",
      items: {
        $ref: "onStatusSchema/v1.1#",
      },
    },
    support: {
      type: "array",
      items: {
        $ref: "supportSchema/v1.1#",
      },
    },
    on_support: {
      type: "array",
      items: {
        $ref: "onSupportSchema/v1.1#",
      },
    },
    track: {
      type: "array",
      items: {
        $ref: "trackSchema/v1.1#",
      },
    },
    on_track: {
      type: "array",
      items: {
        $ref: "onTrackSchema/v1.1#",
      },
    },
    cancel: {
      type: "array",
      items: {
        $ref: "cancelSchema/v1.1#",
      },
    },
    on_cancel: {
      type: "array",
      items: {
        $ref: "onCancelSchema/v1.1#",
      },
    },
  },
};
