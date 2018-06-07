const fs = require('fs');

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

// const printOut = (knapsack) => {
//   let items = `Items to Select: `;
//   let totalCost = 0;
//   let totalValue = 0;

//   knapsack.forEach(item => {
//     items += `${item.index} `;
//     totalCost += item.size;
//     totalValue += item.value;
//   });
//   return `${items}\nTotal cost: ${totalCost}\nTotal value: ${totalValue}`;
// }

const greedyAlgo = (items) => {
  const result = {
    items: "",
    totalCost: 0,
    totalValue: 0
  }

  items.sort((a, b) => {
    // establish scores for each item
    a.score = a.value / a.size;
    b.score = b.value / b.size;
    // order items from highest score to lowest score
    return b.score - a.score;
  })
  // console.log("scored items: ", items);

  let threshold = 100;
  let index = 0;
  while (threshold > 0 && index < items.length) {
    // current item
    const item = items[index];
    if (threshold - (item.size) < 0) {
      // when current item is too large, move on to the next one
      index++;
    } else {
      result.items += `${item.index}, `;
      result.totalCost += item.size;
      result.totalValue += item.value;
      threshold -= items[index].size;
      index++;
    }
  }
  // trim off excess spacing
  result.items = result.items.slice(0, -2);
  return result;
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