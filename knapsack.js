const fs = require("fs"); // file system

const argv = process.argv.slice(2);
// console.log(argv) // node knapsack.js data/filename.txt 100

const filename = argv[0];
const capacity = parseInt(argv[1]);

// read the file
const filedata = fs.readFileSync(filename, "utf8");
const lines = filedata.trim().split(/[\r\n]+/g); // split the filedata on each new line

// process the lines
const items = [];

lines.forEach(line => {
  const [index, size, value] = line.split(" ").map(numStr => +numStr);
  const data = { index, size, value };
  items.push(data);
});

console.log(items);

/*
Strategy 1 - Greedy Strategy
  1. "score" each item by determining its value/weight ratio
  2. sort the items array by each item's ratio where the best ratio items are first
  3. grab items off the top of the array until out knapsack is full
*/
const ratio = array => {
  const addRatio = array.map(item => ({ ...item, ratioSV: item.size / item.value }));
  return addRatio.sort((a, b) => a.ratioSV - b.ratioSV);
}

const greedy = () => {
  let itemsIndex = [], 
      totalCost = 0, 
      totalValue = 0;

  ratio(items).forEach(item => {
    if (totalCost + item.size <= capacity) {
      itemsIndex.push(item.index);
      totalCost += item.size;
      totalValue += item.value;
    }
  });

  return { itemsIndex, totalCost, totalValue };
}

console.log(greedy());