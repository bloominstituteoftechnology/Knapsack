const fs = require('fs');

const args = process.argv.slice(2);

if (args.length != 2) {
    console.error("usage: knapsack infile capacity");
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