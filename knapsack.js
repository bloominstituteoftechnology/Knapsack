const fs = require('fs');

const args = process.argv.slice(2);

const knapsack = {};

if(args.length != 2) {
    console.error("require correct arguments");
    process.exit(1);
}
const filename = args[0];
const thresold =args[1];

let itemInfo = fs.readFileSync(filename,"utf8");

let items = itemInfo.split('\n');
items.pop();
console.log(items);