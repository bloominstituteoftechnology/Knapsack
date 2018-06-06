const fs = require('fs');

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const argv = process.argv.slice(2);

if (argv.length != 2) {
  console.error("usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Read the file
const filedata = fs.readFileSync(filename, "utf8");
// Split the filedata on each new line
const lines = filedata.trim().split(/[\r\n]+/g);

// Process the lines
const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));

  items.push({
    index: index,
    size: size,
    value: value,
  });
}

for (let i = 0; i < items.length; i++) {
    let ratio = items[i].size / items[i].value;
    items[i].ratio = ratio;
}

items.sort( function (a, b) {
    return a.ratio - b.ratio;
});

let selection = [];
let totalSize = 0;
for (let i = 0; i < items.length; i++) {
    if (items[i].size + totalSize <= capacity) {
        selection.push(items[i]);
        totalSize += items[i].size;
    }
}
let results = {
    items: [],
    cost: 0,
    value: 0,
};
for (let i = 0; i < selection.length; i++) {
    results.items.push(selection[i].index);
    results.cost += selection[i].size;
    results.value += selection[i].value;
}

// console.log(items);
// console.log('selection', selection);
console.log('results', 'total cost:', results.cost, 'total value', results.value);