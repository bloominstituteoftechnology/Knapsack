const fs = require('fs');

const threshold = 100;
let arr = [];

const input = process.argv[2];
arr = fs.readFileSync(input, 'utf8').trim().split('\n');

let firstSpace;
let secondSpace;
let cost;
let value;
let valuePerCost;

let result = []
arr.forEach(item => {
   firstSpace = item.indexOf(' ');
   secondSpace = item.lastIndexOf(' ');
   cost = +item.slice(firstSpace + 1, secondSpace);
   value = +item.slice(secondSpace + 1);
   valuePerCost = value / cost;
   result.push([valuePerCost, value, cost, +item.slice(0, firstSpace)]);
});

result.sort((a, b) => b[0] - a[0]);
let totalCost = 0;
let totalValue = 0;
let itemsToSelect = [];
for (let i = 0; i < result.length; i++) {
   let resultCost = result[i][2];
   if (totalCost + resultCost >= threshold) continue;
   totalCost += resultCost;
   totalValue += result[i][1];
   itemsToSelect.push(result[i][3]);
}

console.log(
   `Items to select: ${itemsToSelect.join(' ')}
   Total cost: ${totalCost}
   Total value: ${totalValue}`
);

console.log('result is', result);