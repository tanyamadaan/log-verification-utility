const fs = require('fs');
const path = require('path');

 const convertCSVtoJson = async () => {
    const data = fs.readFileSync(path.join(__dirname, 'pinToStd.csv'), 'utf8');
    let dataStr = data.split('\n');
    // console.log(dataStr);
    let dataToStr = dataStr.map((elem) => {
        const elemArr = elem.split(',');
        const key = elemArr[0];
        const obj = {};
        obj[key] = elemArr[elemArr.length - 1].trim('\r');
        return obj;
    });

    console.log(dataToStr);
    const finalObj = {};
    dataToStr.forEach((elem) => {
        finalObj[Object.keys(elem)[0]] = elem[Object.keys(elem)[0]];
    })
    fs.writeFileSync(path.join(__dirname, 'pinToStd.json'), `${JSON.stringify(finalObj)}`, 'utf8');
    return;
};

module.exports = convertCSVtoJson;