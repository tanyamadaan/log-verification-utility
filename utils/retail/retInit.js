const fs = require("fs");
const _ = require("lodash");
const dao = require("../../dao/dao");
const { checkContext } = require("../../services/service");
const constants = require("../constants");
const validateSchema = require("../schemaValidation");

const checkInit = (init, ErrorObj) => {
  let initObj = ErrorObj;
  try {

    init = init.message.order;

    try {
      console.log(
        `Comparing provider object in /${constants.RET_SELECT} and /${constants.RET_INIT}`
      );

      if (dao.getValue("providerId") != init.provider["id"]) {
        initObj.prvdId = `Provider Id mismatches in /${constants.RET_SELECT} and /${constants.RET_INIT}`;
      }

      if (dao.getValue("providerLoc") != init.provider.locations[0].id) {
        initObj.prvdfrLoc = `Provider.locations[0].id mismatches in /${constants.RET_SELECT} and /${constants.RET_INIT}`;
      }
    } catch (error) {
      console.log(
        `!!Error while checking provider object in /${constants.RET_SELECT} and /${constants.RET_INIT}`,
        error
      );
    }

    try {
      console.log(`Checking billing object in /${constants.RET_INIT}`);
      if (!init["billing"]) {
        initObj.bill = `Billing object missing in /${constants.RET_INIT}`;
      } else {
        const billing = init.billing;
        const tmpstmp = dao.getValue("tmpstmp");
        dao.setValue("billing", billing);
        if (!_.isEqual(billing.created_at, tmpstmp)) {
          initObj.bllngCrtd = `billing.created_at should match context.timestamp`;
        }

        if (!_.isEqual(init.billing.updated_at, tmpstmp)) {
          initObj.bllngUptd = `billing.updated_at should match context.timestamp`;
        }
        // if (
        //   !_.isEqual(init.billing.address.area_code, dao.getValue("buyerAddr"))
        // ) {
        //   initObj.billAreaCode = `area_code in billing.address does not match with area_code in /${constants.RET_SELECT}`;
        // }
      }
    } catch (error) {
      console.log(
        `!!Error while checking billing object in /${constants.RET_INIT}`,
        error
      );
    }

    try {
      console.log(
        `Comparing item Ids and fulfillment ids in /${constants.RET_ONSELECT} and /${constants.RET_INIT}`
      );
      const itemFlfllmnts = dao.getValue("itemFlfllmnts");
      const itemsIdList = dao.getValue("itemsIdList");
      let i = 0;
      const len = init.items.length;
      while (i < len) {
        let itemId = init.items[i].id;
        if (itemId in itemFlfllmnts) {
          if (init.items[i].fulfillment_id != itemFlfllmnts[itemId]) {
            let itemkey = `item_FFErr${i}`;
            initObj[
              itemkey
            ] = `items[${i}].fulfillment_id mismatches for Item ${itemId} in /${constants.RET_ONSELECT} and /${constants.RET_INIT}`;
          }
        } else {
          let itemkey = `item_FFErr${i}`;
          initObj[itemkey] = `Item Id ${itemId} does not exist in /on_select`;
        }

        if (itemId in itemsIdList) {
          if (init.items[i].quantity.count != itemsIdList[itemId]) {
            initObj.cntErr = `Warning: items[${i}].quantity.count for item ${itemId} mismatches with the items quantity selected in /${constants.RET_SELECT}`;
          }
        }
        i++;
      }
    } catch (error) {
      console.log(
        `!!Error while comparing Item and Fulfillment Id in /${constants.RET_ONSELECT} and /${constants.RET_INIT}`);
      console.log(error)
      
    }

    try {
      console.log(`Checking fulfillments objects in /${constants.RET_INIT}`);
      const itemFlfllmnts = dao.getValue("itemFlfllmnts");
      let i = 0;
      const len = init.fulfillments.length;
      while (i < len) {
        //Comparing fulfillment Ids
        let id = init.fulfillments[i].id;
        if (id) {
          if (!Object.values(itemFlfllmnts).includes(id)) {
            key = `ffID${id}`;
            //MM->Mismatch
            initObj[
              key
            ] = `fulfillment id ${id} does not exist in /${constants.RET_ONSELECT}`;
          }

          if (
            !_.isEqual(
              init.fulfillments[i].end.location.gps,
              dao.getValue("buyerGps")
            )
          ) {
            gpskey = `gpsKey${i}`;
            initObj[
              gpskey
            ] = `gps coordinates in fulfillments[${i}].end.location mismatch in /${constants.RET_SELECT} & /${constants.RET_INIT}`;
          }

          if (
            !_.isEqual(
              init.fulfillments[i].end.location.address.area_code,
              dao.getValue("buyerAddr")
            )
          ) {
            addrkey = `addrKey${i}`;
            initObj[
              addrkey
            ] = `address.area_code in fulfillments[${i}].end.location mismatch in /${constants.RET_SELECT} & /${constants.RET_INIT}`;
          }

          //Comparing Provider_id
          // if (init.fulfillments[i].provider_id) {
          //   let prvdrId = init.fulfillments[i].provider_id;
          //   if (prvdrId != dao.getValue("bppId")) {
          //     let key = `ffPrvdrId${prvdrId}`;
          //     initObj[
          //       key
          //     ] = `Provider Id for fulfillment ${id} should be the bpp_id as per the contract`;
          //   }
          // }
        } else {
          initObj.ffId = `fulfillments[${i}].id is missing in /${constants.RET_INIT}`;
        }

        i++;
      }
    } catch (error) {
      console.log(
        `!!Error while checking fulfillments object in /${constants.RET_INIT}`,
        error
      );
    }

    return ErrorObj
    //dao.setValue("initObj", initObj);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`!!File not found for /${constants.RET_INIT} API!`);
    } else {
      console.log(
        `!!Some error occurred while checking /${constants.RET_INIT} API`,
        err
      );
    }
  }
};

module.exports = checkInit;
