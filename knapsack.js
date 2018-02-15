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

///////////////////////////
/// GREEDY             ///
///                   ///
////////////////////////
// matrix.sort((a, b) => a[1]/a[2] - b[1]/b[2]);
// const itemsToSelect = [];
// let capacity = total, totalValue = 0, weight = 0, i = 0;

// while (i < matrix.length) {
//   if (weight + matrix[i][1] <= capacity) {
//     totalValue += matrix[i][2];
//     itemsToSelect.push(matrix[i][0]);
//     weight += matrix[i][1];
//   }
//   i += 1;
// }

// console.log('Items to select:', itemsToSelect.sort((a, b) => a - b));
// console.log('Total cost:', weight);
// console.log('Total value:', totalValue);
