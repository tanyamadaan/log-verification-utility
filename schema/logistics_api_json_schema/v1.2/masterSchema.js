module.exports = {
  $id: "http://example.com/schema/masterSchema/v1.2",
  type: "object",
  properties: {
    search: {
      type: "array",
      items: {
        $ref: "searchSchema/v1.2#",
      },
    },
    on_search: {
      type: "array",
      items: {
        $ref: "onSearchSchema/v1.2#",
      },
    },
    init: {
      type: "array",
      items: {
        $ref: "initSchema/v1.2#",
      },
    },
    on_init: {
      type: "array",
      items: {
        $ref: "onInitSchema/v1.2#",
      },
    },
    confirm: {
      type: "array",
      items: {
        $ref: "confirmSchema/v1.2#",
      },
    },
    on_confirm: {
      type: "array",
      items: {
        $ref: "onConfirmSchema/v1.2#",
      },
    },
    update: {
      type: "array",
      items: {
        $ref: "updateSchema/v1.2#",
      },
    },
    on_update: {
      type: "array",
      items: {
        $ref: "onUpdateSchema/v1.2#",
      },
    },
    status: {
      type: "array",
      items: {
        $ref: "statusSchema/v1.2#",
      },
    },

    on_status: {
      type: "array",
      items: {
        $ref: "onStatusSchema/v1.2#",
      },
    },
    support: {
      type: "array",
      items: {
        $ref: "supportSchema/v1.2#",
      },
    },
    on_support: {
      type: "array",
      items: {
        $ref: "onSupportSchema/v1.2#",
      },
    },
    track: {
      type: "array",
      items: {
        $ref: "trackSchema/v1.2#",
      },
    },
    on_track: {
      type: "array",
      items: {
        $ref: "onTrackSchema/v1.2#",
      },
    },
    cancel: {
      type: "array",
      items: {
        $ref: "cancelSchema/v1.2#",
      },
    },
    on_cancel: {
      type: "array",
      items: {
        $ref: "onCancelSchema/v1.2#",
      },
    },
  },
};
