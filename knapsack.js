const fs = require('fs');
const path = require('path');
const rl = require('readline');

const args = process.argv.slice(2);

if (args.length != 2) {
    console.error("usage: knapsack filename size");
    process.exit(2);
}

let [filename, size] = args;
const filePath = path.resolve(__dirname, filename);

if (fs.existsSync(filePath)) {
    console.log('File to process', filePath);
    const lineReader = rl.createInterface({input: fs.createReadStream(filePath)});
    lineReader.on('line', function (line) {
        let item = line.split(' ')[0];
        let size = line.split(' ')[1];
        let value = line.split(' ')[2];
        console.log('item:', item, ' size:', size, ' value:', value);
    });
}

if (isNaN(size)) {
    console.error(`size must be a number!`);
    process.exit(2);
}

size = ~~Number(size);
