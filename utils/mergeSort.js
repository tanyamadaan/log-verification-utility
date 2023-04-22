const fs = require("fs");
//const async = require("async");
const path = require("path");
const constants = require("./constants");

//module.exports = function(directory, destination) {

const sortMerge = (directory, destination) => {

  try {
      var mergedlogs = []
    //   fs.readdir(directory, (err, files) => {
    //     if (err)
    //         console.log(err);
        files = fs.readdirSync(directory);
        
        let map = constants.SORTED_INDEX

        // Read files and create a single array of all files
        files.map((item,indx)=>{
           let data=fs.readFileSync(`${directory}/${item}`)
           data=JSON.parse(data)
           mergedlogs.push(data)
        })

        // Sort the merged files based on timestamp
        function SortByTimestamp(a, b){
            var aD = new Date(a.context.timestamp), bD = new Date(b.context.timestamp);
            if (+aD  === +bD)
                console.log("Temprered Timestamp")
            return ((aD < bD) ? -1 : ((aD > bD) ? 1 : 0));
        }
        sortedlogs = mergedlogs.sort(SortByTimestamp)

        // Validate the order of actions in logs
        sortedlogs.forEach((element,i) => {
            action = (element.context.action).replace('on_', '')
            if (map.includes(action)) {
                curAction = map.indexOf(action)
                nextAction = map[curAction + 1]
                nextIndex = sortedlogs.findIndex(x => x.context.action === nextAction)
                if (i > nextIndex && !sortedlogs[i].context.action.includes("confirm")) {
                    console.log("flow incorrect") // Addition - If on_init includes domain error, select call might be invoked post on_init.
                                                    // Need to add this validation.
                }
            }
            
        });
        //Write the joined results to destination
        // fs.writeFile(destination, JSON.stringify(mergedlogs), (err) => {
        //     if (err)
        //      { console.log(err)
        //         reject(err);}
        fs.writeFileSync(destination, JSON.stringify(mergedlogs))
        //});
    // });

} catch (err) {
    console.log(`Error while running merging log files, ${err}`)
  }
}
module.exports = sortMerge
// const cwd = __dirname
// const destination = path.join(cwd, '../../test.json')
// const directory = path.join(cwd, '../logs/Flow1')
// //const directory = '/Users/tanyamadaan/Desktop/Log-Verification/reference-implementations/utilities/log-validation-utility/utils/logs/Flow1'

// sortMerge(directory, destination)