module.exports = {
    $id: "http://example.com/schema/masterSchema",
    type: "object",
    properties: {
      search: {
        type: "array",
        items: {
          allOf: {
            $ref: "searchSchema#"
          }
        } 
      },
      on_search: {
        type: "array",
        items: {
          allOf: {
            $ref: "onSearchSchema#"
          }
        } 
      },
      init: {
        type: "array",
        items: {
          allOf: {
            $ref: "initSchema#"
          }
        } 
      },
      on_init: {
        type: "array",
        items: {
          allOf: {
            $ref: "onInitSchema#"
          }
        } 
      },
      confirm: {
        type: "array",
        items: {
          allOf: {
            $ref: "confirmSchema#"
          }
        } 
      },
      on_confirm: {
        type: "array",
        items: {
          allOf: {
            $ref: "onConfirmSchema#"
          }
        } 
      },
      update: {
        type: "array",
        items: {
          allOf: {
            $ref: "updateSchema#"
          }
        } 
      },
      on_update: {
        type: "array",
        items: {
          allOf: {
            $ref: "onUpdateSchema#"
          }
        } 
      },
      status: {
        type: "array",
        items: {
          allOf: {
            $ref: "statusSchema#"
          }
        } 
      },
      on_status: {
        type: "array",
        items: {
          allOf: {
            $ref: "onStatusSchema#"
          }
        } 
      },
      support: {
        type: "array",
        items: {
          allOf: {
            $ref: "supportSchema#"
          }
        } 
      },
      on_support: {
        type: "array",
        items: {
          allOf: {
            $ref: "onSupportSchema#"
          }
        } 
      },
      track: {
        type: "array",
        items: {
          allOf: {
            $ref: "trackSchema#"
          }
        } 
      },
      on_track: {
        type: "array",
        items: {
          allOf: {
            $ref: "onTrackSchema#"
          }
        } 
      }
    }
  };
  