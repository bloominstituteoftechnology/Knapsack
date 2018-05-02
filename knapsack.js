const fs = require("fs");

const args = process.argv.slice(2);
const weights = [], values = [];

if (args.length != 2) {
  console.error("usage: knapsack filename sack-size");
  process.exit(2);
}

const sackSize = (parseInt(args[1], 10));

if (!Number.isInteger(sackSize)) {
  console.error("sack-size must be an integer!");
  process.exit(2);
}

const treasure = fs.readFileSync(`./data/${args[0]}`, 'utf8', (err, fd) => {
  if (err) throw err;
}).split('\n');

for (let item of treasure) {
  item = item.trim();
  if (item === '') continue;
  item = item.split(' ');
  weights.push(parseInt(item[1], 10));
  values.push(parseInt(item[2], 10));
}

console.log(`${sackSize} slots total in knapsack.`);
console.log(weights);
