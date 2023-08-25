const fs = require("fs");
const path = require("path");
const constants = require("./constants");

const sortMerge = (directory, destination) => {
  flowErrObj={}
  try {
    var mergedlogs = [];
    files = fs.readdirSync(directory);

    let map = constants.SORTED_INDEX;

    mergedlogs = files.reduce((acc, item) => {
      try {
        let data = fs.readFileSync(`${directory}/${item}`);
        data = JSON.parse(data);
        const context = data.context;
        if (!context || !context.action) {
          console.log(
            `Error in file ${item}: Missing 'context' or 'action' property`
          );
          return acc; // Skip this data and continue with the next iteration
        }
        const { action } = data.context;
        if (acc.hasOwnProperty(action)) {
          acc[action].push(data);
        } else {
          acc[action] = [data];
        }
        return acc;
      } catch (error) {
        console.log(`Error in file ${item}`);
        console.trace(error);
      }
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

    Object.entries(mergedlogs).forEach(([action], i, entries) => {
      const curAction = action.replace("on_", "");

      if (map.includes(curAction)) {
        const curIndex = map.indexOf(curAction);

        const nextAction = map[curIndex + 1];

        const nextIndex = entries.findIndex(
          ([a]) => a.replace("on_", "") === nextAction
        );
        if (i > nextIndex && !action.includes("confirm")) {
          console.log(`Flow incorrect- current action: ${action}, index :${i}, nextIndex:${nextIndex}`);
          flowErrObj[curIndex]= `Incorrect Flow - (${Object.keys(mergedlogs)})`
        }
      }
    });

    fs.writeFileSync(destination, JSON.stringify(mergedlogs));
    return flowErrObj;
  } catch (err) {
    console.log(`Error while running merging log files, ${err}`);
    console.trace(err);
  }
};

module.exports = { sortMerge };
// const cwd = __dirname;
// const destination = path.join(cwd, "./testCopy.json");
// const directory = path.join(cwd, "../public/logs/flow4");
// //const directory = '/Users/tanyamadaan/Desktop/Log-Verification/reference-implementations/utilities/log-validation-utility/utils/logs/Flow1'

// sortMerge(directory, destination);
