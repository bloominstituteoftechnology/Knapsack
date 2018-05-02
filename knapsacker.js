const fs = require('fs');

const args = process.argv.slice(2);

if (args.length != 2) {
    console.error("usage: knapsack infile capacity");
    process.exit(1);
}

const filename = `./data/${args[0]}`;
const capacity = args[1];

const filedata = fs.readFileSync(filename, "utf8");

const lines = filedata.trim().split(/[\r\n]+/);

const items = [];

function compare (a, b) {
  return b.ratio - a.ratio;
}

for (let l of lines) {
    const [index, size, value] = l.split(/\s+/).map(n => parseInt(n));

    items[index] = {
        index: index,
        size: size,
        value: value,
        ratio: value/size
    };
}

// console.log(items.sort(compare));
items.sort(compare);
const objectsUsed = [];
let totalValue = 0;
result = items.reduce((memo, obj) => {
  if (memo + obj.size <= capacity) {
    memo += obj.size;
    totalValue += obj.value;
    objectsUsed.push(obj);
  }
  return memo;
}, 0);

// console.log(objectsUsed);
console.log(`Cost: ${result}, Value: ${totalValue}`);