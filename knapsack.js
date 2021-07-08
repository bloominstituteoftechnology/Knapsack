const fs = require('fs');
const argv = process.argv.slice(2);

function naiveKnapsack(items, capacity) {
  // go through each obj
  // divide its size / value
  // store ratios
  let ratioArr = [];
  for (let i = 0; i < items.length; i++) {
    // console.log('item at index', items[i].index, items[i].size, 'size');
    // console.log('ratio', items[i].size / items[i].value);
    ratioArr[items[i].index] = {
      index: items[i].index,
      ratio: items[i].size / items[i].value,
      size: items[i].size,
      value: items[i].value,
    };
  }
  ratioArr.shift();

  // order ratios
  const sortByRatio = ratioArr.slice(0);
  sortByRatio.sort((a, b) => {
    return a.ratio - b.ratio;
  });
  console.log('sortbyratio', sortByRatio);

  // Items to select: 2, 8, 10
  // Total cost: 98
  // Total value: 117

  const initKnapsack = {
    itemsSelected: [],
    totalCost: 0,
    totalValue: 0,
  };
  let sack = capacity;
  let value = 0;
  while (sack >= 0) {
    for (let obj of sortByRatio) {
      if (sack - obj.size > 0) {
        sack -= obj.size;
        value += obj.value;
        initKnapsack.itemsSelected.push(obj.index);
        filledKnapsack = {
          ...initKnapsack,
          totalCost: capacity - sack,
          totalValue: value,
        };
      }
    }
    return filledKnapsack;
  }
  // go through each ratio
  // while capacity under
  // hold ratio index

  // return items meeting knapsack reqs
  return 'meh';
}

if (argv.length !== 2) {
  console.log('usage: [filename], [capacity]');
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

const fileData = fs.readFileSync(filename, 'utf8');
const lines = fileData.trim().split(/[\r\n]+/g);

const items = [];
for (let line of lines) {
  const [index, size, value] = line.split(' ').map(n => parseInt(n));
  items[index] = {
    index,
    size,
    value,
  };
}

items.shift();

console.log('Naive Knapsack Implementation: ', naiveKnapsack(items, capacity));
