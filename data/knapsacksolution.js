// const fs = require('fs');

// const args = process.argv.slice(2);
// if (args.length !== 2) {
//     console.error('There must be two and only two additional arguments in the CLI');
//     process.exit(1);
// }

// const file = args[0];
// const capacity = args[1];
// const filedata = fs.readFileSync(file, 'utf8');
// const entries = filedata.trim().split(/[\r\n]+/);
// const items = [];

// for (let line of entries) {
//     const [index, size, value] = line.split(/\s+/).map(n => +n);
//     items[index] = {
//         index,
//         size,
//         value,
//     };
// }

// console.log(items);

const fs = require("fs");
const args = process.argv.slice(2); // node is the first argument

if (args.length != 2) {
    console.error("Usage: Knapsack infile capacity");
    process.exit(1);
}

const filename = args[0];
const capacity = args[1];

const filedata = fs.readFileSync(filename, "utf8");

const lines = filedata.trim().split(/[\r\n]+/);

const items = [];

for (let l of lines) {
    const [index, size, value] = l.split(/\s+/).map(n => parseInt(n));

    items[index] = {
        index: index,
        size: size,
        value: value
    };
}

console.log(items);