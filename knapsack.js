const fs = require('fs');

const argv = process.argv.slice(2);

if (argv.length !== 2) {
  console.log("Usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Read the input file
const filedata = fs.readFileSync(filename, 'utf8');
const lines = filedata.trim().split(/[\r\n]+/g);

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(' ').map(Number);
  items.push({ index, size, value });
}

const displayItems = items => {
  const indices = [];
  let totalCost = 0;
  let totalValue = 0;
  items.forEach(x => {
    indices.push(x.index);
    totalCost += x.size;
    totalValue += x.value;
  });
  console.log(`Items to select: ${indices.sort().join(', ')}\nTotal cost: ${totalCost}\nTotal value: ${totalValue}`);
}

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const greedy = (items, capacity) => {
  const sortedItems = items.map(x => {
    x.ratio = x.value / x.size;
    return x;
  }).sort((a, b) => b.ratio - a.ratio);
  const pack = [];
  let pickedSize = 0;
  for (let i = 0; i < sortedItems.length; i++) {
    if (pickedSize + sortedItems[i].size <= capacity) { 
      pack.push(sortedItems[i]);
      pickedSize += sortedItems[i].size;
    }
  }
  displayItems(pack);
}

greedy(items, capacity);