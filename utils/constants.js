module.exports = Object.freeze({
  RET_CONTEXT_TTL: "PT30S",
  RET_CONTEXT_ACTION: "action",
  DB_PATH: "dbfiles",
  DB_Keys: {"search": {"context": ['timestamp', 'transaction_id', 'message_id', 'city'],
            "message": {"intent": {"payment": ['@ondc/org/buyer_app_finder_fee_amount']}}},
            "on_search": {"context": ['bap_id', 'bpp_id'], "message": ['catalog']}},
  SORTED_INDEX: ['search','on_search','init','on_init','confirm','on_confirm'],
  RET_SEARCH: "search",
  RET_ONSEARCH: "on_search",
  RET_SELECT: "select",
  RET_ONSELECT: "on_select",
  RET_INIT: "init",
  RET_ONINIT: "on_init",
  RET_CONFIRM: "confirm",
  RET_ONCONFIRM: "on_confirm",
  RET_TRACK: "track",
  RET_ONTRACK: "on_track",
  RET_CANCEL: "cancel",
  RET_ONCANCEL: "on_cancel",
  RET_UPDATE: "update",
  RET_ONUPDATE: "on_update",
  RET_STATUS: "status",
  RET_ONSTATUS: "on_status",
  RET_SUPPORT: "support",
  RET_ONSUPPORT: "on_support",
   //logistics
   LOG_CONTEXT_TTL: "PT30S",
   LOG_CONTEXT_ACTION: "action",
   LOG_SEARCH: "search",
   LOG_ONSEARCH: "on_search",
   LOG_INIT: "init",
   LOG_ONINIT: "on_init",
   LOG_CONFIRM: "confirm",
   LOG_ONCONFIRM: "on_confirm",
   LOG_TRACK: "track",
   LOG_ONTRACK: "on_track",
   LOG_CANCEL: "cancel",
   LOG_ONCANCEL: "on_cancel",
   LOG_UPDATE: "update",
   LOG_ONUPDATE: "on_update",
   LOG_STATUS: "status",
   LOG_ONSTATUS: "on_status",
   LOG_SUPPORT: "support",
   LOG_ONSUPPORT: "on_support",

});
