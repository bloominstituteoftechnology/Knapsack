const fs = require('fs');
const argv = process.argv.slice(2);

// add an error check to check the number of params
if (argv.length !== 2) {
  console.error("usage: [filename] [capacity]");
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

// read the file that was passed to our program
const fileData = fs.readFileSync(filename, 'utf8');

// split it into an array
const lines = fileData.trim().split(/[\r\n]+/g);

// process the lines, arrange the items according to the value/weight ratio and then sort them
const items = lines.map(line => {
  const [index, size, value] = line.split(' ');
  return { index, size, value };
}).map(item => {
  return {
    index: parseInt(item.index),
    size: parseInt(item.size),
    value: parseInt(item.value),
    normalized: (parseInt(item.value) / parseInt(item.size)).toFixed(2),
  };
});

// sort the items according to the normalized data
items.sort((a, b) => b.normalized - a.normalized);

const knapsack = {
  chosen: [],
  size: 0,
  value: 0,
  capacity: capacity,
};

items.forEach((item, i) => {
  if(items[i].size <= knapsack.capacity) {
    knapsack.chosen.push(items[i].index);
    knapsack.size += items[i].size;
    knapsack.value += items[i].value;
    knapsack.capacity -= items[i].size;
  }
});

// another idea is to run  thorugh the list again, this time checking the total and capacity, TBD

console.log('Greedy SnapSack implementation: ', knapsack);
