// take user inputted filename/threshold
const fs = require('fs');

const args = process.argv.slice(2);

if (args.length != 2) {
  console.error("require correct arguments");
  process.exit(1);
}

let filename = args[0];
let threshold = args[1];

let itemInfo = fs.readFileSync(filename, 'utf-8');
let items = itemInfo.split('\n');
items.pop();

for(let i = 0; i < items.length; i++) {
  items[i] = items[i].split(' ');
}
// Input:
// Values (stored in array v) 3rd number
let values = [];
items.forEach(item => {
  values.push(parseInt(item[2]));
})

// Weights (stored in array w) 2nd number
let weights = [];
items.forEach(item => {
  weights.push(parseInt(item[1]));
})
// Number of distinct items (n)
let n = items.length;

// Knapsack capacity (W)
threshold = parseInt(threshold);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (weights[i] > j) {

    }
  }
}
