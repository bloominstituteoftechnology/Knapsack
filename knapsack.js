const fs = require('fs');
const args = process.argv;

const filePath = args[ 2 ];
const knapsackSize = Number(args[ 3 ]);
let file = fs
  .readFileSync(filePath, 'utf-8')
  .split('\n')
  .map(line => {
    line = line.split(' ');
    return line.map(el => Number(el));
  });
file.pop(); // Removes empty element at the end

const items = {};

file.forEach(item => {
  items[ item[ 0 ] ] = { size: item[ 1 ], value: item[ 2 ] };
});

// console.log(file, knapsackSize);
// console.log(items);

const knapsack = {
  maxSize: knapsackSize,
  currentSize: 0,
  currentValue: 0,
  items: []
};

console.log(knapsack);

for (let item in items) {
  item = items[item];
  if (
    knapsack.currentSize < knapsack.maxSize &&
    knapsack.currentSize + item.size <= knapsack.maxSize
  ) {
    knapsack.items.push(item);
    knapsack.currentSize += item.size;
    knapsack.currentValue += item.value;
  }
}

console.log(knapsack);
