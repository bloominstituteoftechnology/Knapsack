const fs = require("fs");

/*
  Greedy Strat
  1. Score each item by determining its value/weight ratio
  2. Sort the items by each item's weight/value efficiency
  3. Grab items off the top until we get a full knapsack
*/

const argv = process.argv.slice(2);

if (argv.length !== 2) {
  console.error("usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

const filedata = fs.readFileSync(filename, "utf8");
const lines = filedata.trim().split(/[\r\n]+/g);

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));
  if (size <= capacity) {
    items.push({
      index: index,
      size: size,
      value: value
    });
  }
}

const greedyAlgo = (items, capacity) => {
  const result = {
    size: 0,
    value: 0,
    chosen: []
  };
  for (let i of items) {
    i.worth = i.value / i.size;
  }
  items.sort((a, b) => b.worth - a.worth);
  for (let i = 0; i < items.length; i++) {
    if (result.size + items[i].size <= capacity) {
      result.size += items[i].size;
      result.value += items[i].value;
      result.chosen.push(items[i].index);
    }
  }
  return result;
};

console.log(greedyAlgo(items, capacity));
