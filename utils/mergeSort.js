const fs = require("fs");
//const async = require("async");
const path = require("path");
const constants = require("./constants");

//module.exports = function(directory, destination) {

const sortMerge = (directory, destination) => {
  try {
    var mergedlogs = [];
    //   fs.readdir(directory, (err, files) => {
    //     if (err)
    //         console.log(err);
    files = fs.readdirSync(directory);

    let map = constants.SORTED_INDEX

    // Read files and create a single array of all files
    // files.map((item,indx)=>{
    //    let data=fs.readFileSync(`${directory}/${item}`)
    //    data=JSON.parse(data)
    //    mergedlogs.push({ [data?.context?.action]: data })
    // })
    mergedlogs = files.reduce((acc, item) => {
      let data = fs.readFileSync(`${directory}/${item}`);
      data = JSON.parse(data);
      const { action } = data.context;
      if (acc.hasOwnProperty(action)) {
        acc[action].push(data);
      } else {
        acc[action] = [data];
      }
      return acc;
    }, {});

    // Sort the arrays within each action based on context.timestamp
    for (const action in mergedlogs) {
      const array = mergedlogs[action];
      if (array.length > 1) {
        array.sort(
          (a, b) =>
            new Date(a.context.timestamp) - new Date(b.context.timestamp)
        );
      }
    }

    // Sort the mergedlogs object based on the first element of each array's context.timestamp
    const sortedmergedlogs = {};
    Object.keys(mergedlogs)
      .sort(
        (a, b) =>
          new Date(mergedlogs[a][0].context.timestamp) -
          new Date(mergedlogs[b][0].context.timestamp)
      )
      .forEach((key) => {
        sortedmergedlogs[key] = mergedlogs[key];
      });

    // Assign the sorted data back to mergedlogs
    mergedlogs = sortedmergedlogs;
    // Sort the merged files based on timestamp
    // function SortByTimestamp(a, b){
    //     var aD = new Date(a.context.timestamp), bD = new Date(b.context.timestamp);
    //     if (+aD  === +bD)
    //         console.log("Temprered Timestamp")
    //     return ((aD < bD) ? -1 : ((aD > bD) ? 1 : 0));
    // }
    // sortedlogs = mergedlogs.sort(SortByTimestamp)

    // // Validate the order of actions in logs
    Object.entries(mergedlogs).forEach(([action], i, entries) => {
        const curAction = action.replace('on_', '');
        if (map.includes(curAction)) {
          const curIndex = map.indexOf(curAction);
          const nextAction = map[curIndex + 1];
          const nextIndex = entries.findIndex(([a]) => a.replace('on_', '') === nextAction);
          if (i > nextIndex && !action.includes('confirm')) {
            console.log('flow incorrect');
          }
        }
      });
    // sortedlogs.forEach((element,i) => {
    //     action = (element.context.action).replace('on_', '')
    //     if (map.includes(action)) {
    //         curAction = map.indexOf(action)
    //         nextAction = map[curAction + 1]
    //         nextIndex = sortedlogs.findIndex(x => x.context.action === nextAction)
    //         if (i > nextIndex && !sortedlogs[i].context.action.includes("confirm")) {
    //             console.log("flow incorrect") // Addition - If on_init includes domain error, select call might be invoked post on_init.
    //                                             // Need to add this validation.
    //         }
    //     }

    // });
    //Write the joined results to destination
    // fs.writeFile(destination, JSON.stringify(mergedlogs), (err) => {
    //     if (err)
    //      { console.log(err)
    //         reject(err);}
    fs.writeFileSync(destination, JSON.stringify(mergedlogs));
    //});
    // });
  } catch (err) {
    console.log(`Error while running merging log files, ${err}`);
    console.trace(err);
  }
};

// module.exports = sortMerge
const cwd = __dirname;
const destination = path.join(cwd, "./testCopy.json");
const directory = path.join(cwd, "../public/logs/flow4");
//const directory = '/Users/tanyamadaan/Desktop/Log-Verification/reference-implementations/utilities/log-validation-utility/utils/logs/Flow1'

sortMerge(directory, destination);
