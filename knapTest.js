if (process.argv.length < 3){
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}

const filename = process.argv[2];
const fs = require("fs");

const incomingData = fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    console.log("OK: " + filename);
    console.log(data);
    return data;
})

console.log(incomingData);
