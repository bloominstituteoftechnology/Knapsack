const fs = require("fs");

const args = process.argv.slice(2);
const weights = [], values = [];
// let cost = 0;

function knapSackRecursive(capacity) {
  function ksr(i, size) {
    if (i === 0) {
      return 0;
    } else if (weights[i] > size) {
      return ksr(i - 1, size);
    } else {
      return Math.max(
        ksr(i - 1, size),
        ksr(i - 1, size - weights[i]) + values[i],
      );
    }
  }
  return ksr(weights.length - 1, capacity);
}

if (args.length < 1) {
  console.error("usage: knapsack <filename> [sack-size]");
  process.exit(2);
}

let sackSize = (parseInt(args[1], 10));

if (!Number.isInteger(sackSize)) {
  sackSize = 100;
}

const treasure = fs.readFileSync(`./data/${args[0]}`, 'utf8', (err, fd) => {
  if (err) throw err;
}).split(/\r?\n/);

for (let item of treasure) {
  item = item.trim();
  if (item === '') continue;
  item = item.split(' ');
  weights.push(parseInt(item[1], 10));
  values.push(parseInt(item[2], 10));
}

console.time('Process Time');
const value = knapSackRecursive(sackSize);

console.log(`${sackSize} slots total in knapsack.`);
console.log(`Slots Used: TODO, Total Value: ${value}`);
console.timeEnd('Process Time');