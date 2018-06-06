const fs = require('fs');
const argv= process.argv.slice(2);

function Knapsack(items, capacity) {
  let ratioArray = [];
  for (let i = 0; i < items.length; i++) {
    ratioArray[items[i].index] = {
      index: items[i].index,
      ratio: (items[i].size / items[i].value).toFixed(2),
      size: items[i].size,
      value: items[i].value,
    };
  }
  ratioArray.shift();
  const sortByRatio = ratioArray.slice(0);
  sortByRatio.sort((a, b) => {
    return a.ratio - b.ratio;
  });
  console.log('sortbyratio', sortByRatio);

  const initKnapsack = {
    itemsSelected: [],
    totalCost: 0,
    totalValue: 0,
  };
  let knap = capacity;
  let value = 0;
  while (knap >= 0) {
    for (let obj of sortByRatio) {
      if (knap - obj.size > 0) {
        knap -= obj.size;
        value += obj.value;
        initKnapsack.itemsSelected.push(obj.index);
        fullKnapsack = {
          ...initKnapsack,
          totalCost: capacity - knap,
          totalValue: value,
        };
      }
    }
    return fullKnapsack;
  }
  return 'knapsack';
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

console.log('Knapsack Implementation: ', Knapsack(items, capacity));