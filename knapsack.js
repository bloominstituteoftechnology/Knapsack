const fs = require('fs');
const args = process.argv;
const filePath = args[ 2 ];
const knapsackSize = Number(args[ 3 ]);

// Parse file
let file = fs
  .readFileSync(filePath, 'utf-8')
  .split('\n')
  .map(line => {
    line = line.split(' ');
    return line.map(el => Number(el));
  });
file.pop(); // Removes empty element at the end

const items = [];

file.forEach(item => {
  items.push({
    id: item[ 0 ],
    size: item[ 1 ],
    value: item[ 2 ],
    valuePerSize: item[ 2 ] / item[ 1 ]
  });
});

items.sort((a, b) => b.valuePerSize - a.valuePerSize);

const knapsack = {
  maxSize: knapsackSize,
  currentSize: 0,
  totalValue: 0,
  items: []
};

items.forEach((item, i) => {
  item = items[ i ];
  if (
    knapsack.currentSize < knapsack.maxSize &&
    knapsack.currentSize + item.size <= knapsack.maxSize
  ) {
    knapsack.items.push(item);
    knapsack.currentSize += item.size;
    knapsack.totalValue += item.value;
  }
});

console.log('KNAPSACK:\n', knapsack);

