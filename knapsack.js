const fs = require('fs');

function knapsack(items, capacity) {
  let result = {
    value: 0,
    size: 0,
    chosen: []
  };

  // add value/size ratio for each item
  for (let i = 0; i < items.length; i++) {
    items[i].precious = items[i].value / items[i].size;
  }
  
  // sort by ratio
  items.sort((a, b) => b.precious - a.precious); 
  
  // determine result 
  for (let i = 0; i < items.length; i++) {
    if ((result.size + items[i].size) <= capacity) {
      result.value += items[i].value;
      result.size += items[i].size;
      result.chosen.push(items[i].index);
  }

  return result;
}

const argv = process.argv.slice(2);

// add an error check to check the number of params
if (argv.length != 2) {
  console.error('usage: [filename] [capacity]');
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

// read the file that was passed to our program

const filedata = fs.readFileSync(filename, 'utf8');

const lines = filedata.trim().split(/[\r\n]+/g);

// process the lines 

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(' ').map(n => parseInt(n));
  
  items[index] = {
    index,
    size,
    value,
  };
}

items.shift();

console.log("Result: ", knapsack(items, capacity));
