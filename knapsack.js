const fs = require('fs');

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const printOut = (knapsack) => {
  let items = `Items to Select: `;
  let totalCost = 0;
  let totalValue = 0;

  knapsack.forEach(item => {
    items += `${item.index} `;
    totalCost += item.size;
    totalValue += item.value;
  });
  return `${items}\nTotal cost: ${totalCost}\nTotal value: ${totalValue}`;
}

const greedyAlgo = (items) => {
  const result = items.filter(item => {
    return item.size < 101;
  });

  result.forEach(item => {
    return item.score = item.value / item.size;
  });

  result.sort((a, b) => {
    return b.score - a.score;
  })
  console.log("scored items: ", result);

  const knapsack = [];
  let threshold = 100;
  let index = 0;
  while (threshold > 0 && index < result.length) {
    const item = result[index];
    if (threshold - (item.size) < 0) {
      index++;
    } else {
      knapsack[index] = result[index];
      threshold -= result[index].size;
      index++; 
    }
  }
  console.log("threshold: ", threshold);
  return printOut(knapsack);
}

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

console.log(greedyAlgo(items));