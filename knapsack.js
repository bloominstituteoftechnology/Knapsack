const fs = require('fs');
const args = process.argv.slice(2);

if (args.length != 2) {
  console.error("usage: knapsack-generator filename size");
  process.exit(2);
}

const filename = args[0];
const contents = fs.readFileSync(filename, 'utf8');

const total = +args[1].split('=')[1];
const matrix = contents
  .split(/\r?\n/)
  .map((line) => line? line.split(' ').map((val) => +val) : null);
matrix.pop();

///////////////
matrix.sort((a, b) => a[2]/a[1] < b[2]/b[1]);
const itemsToSelect = [];
let capacity = total, totalValue = 0, totalCost = 0, i = 0;
while (capacity - matrix[i][1] >= 0) {
  totalValue += matrix[i][2];
  totalCost += matrix[i][1];
  itemsToSelect.push(matrix[i][0]);
  capacity -= matrix[i][1];
  i += 1;
}

console.log('Items to select:', itemsToSelect.sort((a, b) => a - b));
console.log('Total cost:', totalCost);
console.log('Total value:', totalValue);
