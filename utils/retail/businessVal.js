const fs = require("fs");
const utils = require("../utils");
const constants = require("../constants");
const path = require("path");
const servicabilityCheck = require("../ServicabilityCheck")
const checkOnSelect = require("./retOnSelect");

const flowVal = (dirPath, ErrorObj) => {
    try {
        let log = fs.readFileSync(dirPath);
        log = JSON.parse(log);
        const counts = {};
        for (const element of log) {
            action = element['context']['action']
            counts[action] = counts[action] ? counts[action] + 1 : 1;
        }
        count = 1
        if (dirPath.includes('Flow1')) {
            try {
                console.log("Validating Business Flow1")
                bvObj = ErrorObj['Flow1'] = {}

            } catch (error) {
                console.log(
                    `Error while running flow1 checks`,
                    error
                );
            }
        }
        else if (dirPath.includes('Flow2')) {
            try {
                bvObj = ErrorObj['Flow2'] = {}
                console.log("Validating Business Flow2")
                i = 1
                if (counts['on_select'] <= 1 || counts['select'] <= 1) {
                    console.log("Business Flow2 expected more than 1 /on_select callbacks")
                    bvObj[i] = "Business Flow2 expected more than 1 /on_select callbacks"
                    i += 1
                }
                if (counts['cancel'] >= 1) {
                    console.log('Business Flow2 do not expect buyer initiated cancel request')
                    bvObj[i] = 'Business Flow2 do not expect buyer initiated cancel request'
                    i += 1
                }
                if (!('on_cancel' in counts)) {
                    console.log('Business Flow2 expected seller side cancel request')
                    bvObj[i] = 'Business Flow2 expected seller side cancel request'
                    i += 1
                }
                log.forEach((element, index) => {
                    action = (element.context.action)
                    if (!(action in bvObj))
                        bvObj[action] = {}
                    errorObj = bvObj[action]
                    if (action === 'on_select' & count < (counts[action])) {
                        count += 1
                        const check = servicabilityCheck(element, errorObj)
                        if (!check) {
                            errorObj[i] = "Business Flow2 expected 'non-servicable'in initial on_select"
                            console.log("Business Flow2 expected 'non-servicable'in initial on_select")
                            i += 1
                        }
                        else {
                            console.log(`Successfully Tested non-servicability in /${action}`)
                        }
                    }
                    else if (action === 'on_select' & count == counts[action]) {

                        const check = servicabilityCheck(element, bvObj)
                        if (check) {
                            bvObj[i] = "Business Flow2 did not expect 'non-servicable'in last on_select callback"
                            console.log("Business Flow2 did not expect 'non-servicable'in last on_select callback")
                            i += 1
                        }
                        else {
                            console.log(`Successfully Tested servicability in /${action}`)
                        }
                        //let onSltResp = checkOnSelect(payload, bvObj)
                    }
                });
            } catch (error) {
                console.log(
                    `Error while running flow2 checks`,
                    error
                );
            }
        }
        else if (dirPath.includes('Flow3')) {
            try {
                console.log("Validating Business Flow3")
                ErrorObj = ErrorObj['Flow3']
                i = 1
                if (!('on_status' in counts)) {
                    ErrorObj[i] = "Business Flow3 expected status update to be sent through unsolicited /on_status"
                }
                if (!(action in ErrorObj))
                        ErrorObj[action] = {}
                    flow3Obj = ErrorObj[action]
                if (action == 'update') {
                    returnFlag = 0;
                    update = element.message.order;
                    update.items.forEach((item, i) => {
                        if (item.hasOwnProperty("tags")) {
                            if (item.tags.update_type === "return") {
                                returnFlag = 1;
                                return_item_id = item.id
                            }
                        }
                    })
                    if (!returnFlag) {
                        flow3Obj[action] = "Business Flow3 expected one order to be cancelled"
                    }
                }
                if (action == 'on_update' & return_item_id) {
                    on_update = element.message.order;
                    on_update.items.forEach((item, i) => {
                        if (item.id == return_item_id) {
                            if (!item.hasOwnProperty("tags") || !item.tags.update_type === "Return_Rejected") {
                                flow3Obj[action] = "Business Flow3 expected item return to be rejected by seller"
                            }
                        }
                    });
                }
            } catch (error) {
                console.log(
                    `Error while running flow3 checks`,
                    error
                );
            }

        }
        else if (dirPath.includes('Flow4')) {
            try {
                console.log("Validating Business Flow4")
                ErrorObj = ErrorObj['Flow4']
            } catch (error) {
                console.log(
                    `Error while running flow4 checks`,
                    error
                );
            }

        }
        else if (dirPath.includes('Flow5')) {
            try {
                console.log("Validating Business Flow5")
                ErrorObj = ErrorObj['Flow5']
            } catch (error) {
                console.log(
                    `Error while running flow5 checks`,
                    error
                );
            }

        }
    return ErrorObj
    } catch (err) {
        console.log(
            `!!Some error occurred while running business validations`,
            err
        );
    }
};
module.exports = flowVal