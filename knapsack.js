const fs = require('fs');
const args = process.argv.slice(2);
const values = [];
const sizes  = [];
const table  = [];

if(args.length != 2) {
    console.error("usage: ./knapsack fileData threshold");
    process.exit(2);
}

let [filename, threshold] = args;

if (isNaN(threshold)) {
    console.error(`threshold must be a number!`);
    process.exit(2);
}

const getData = () => fs.readFileSync(filename, 'utf-8');

const file = getData();
let lines = file.trim().split('\n');

const n = lines.length; //number of items

const start = Date.now();
for(let i = 0; i < n; i++) {

    values.push(parseInt(lines[i].split(' ')[2]));
    sizes.push(parseInt(lines[i].split(' ')[1]));
    table[i] = [];

}

for(let j = 0; j < threshold ; j++) {
    table[0][j] = 0;
}

for(let i = 1; i < n; i++) {

}

const end = Date.now();

console.log('EXCUTION TIME: ', ((end - start) / 1000).toFixed(4));

