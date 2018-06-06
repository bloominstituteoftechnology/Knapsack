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

/*
Strategy 1 - Greedy Strategy
  1. "score" each item by determining its value/weight ratio
  2. sort the items array by each item's ratio where the best ratio items are first
  3. grab items off the top of the array until out knapsack is full
*/

const greedy = () => {
  let chosenItems = [], totalCost = 0, totalValue = 0;
  
  const withRatio = items.map(item => ({ ...item, ratioSV: item.size / item.value }));
  const sortedWithRatio = withRatio.sort((a, b) => a.ratioSV - b.ratioSV);

  sortedWithRatio.forEach(item => {
    if (totalCost + item.size <= capacity) {
      chosenItems.push(item.index);
      totalCost += item.size;
      totalValue += item.value;
    }
  });

  return { chosenItems, totalCost, totalValue };
}

console.log(greedy());

/*
Strategy 2 - Iterative Bottom-Up
*/