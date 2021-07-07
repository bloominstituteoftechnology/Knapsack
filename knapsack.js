const fs = require('fs');
const filename = process.argv[2] + '';

const start = Date.now();

//get knapsack size
let knapSize = process.argv[3];
const cmdRegEx = /\d+/;
knapSize = knapSize.match(cmdRegEx)[0];

//push items into array
const file = fs.readFileSync(filename, 'binary').split('\n');
let items = [];
file.forEach((item) => {
  items.push(item);
});

//add ratios to items
let itemRatios = [];
const itemRegEx = /(\d+)\s(\d+)\s(\d+)/;
items.forEach((item, index) => {
  //last line of every file is a blank line
  if (item.length) {
    let itemGrouping = item.match(itemRegEx);
    let tempItem = itemGrouping[1]; // item number
    let tempCost = itemGrouping[2]; // item weight/size
    let tempValue = itemGrouping[3]; // item value
    let tempRatio = itemGrouping[2] / itemGrouping[3];
    itemRatios.push([tempItem, tempCost, tempValue, tempRatio]);
  }
});

//sort ratios in descending order
itemRatios.sort((a, b) => {
  return a[3] - b[3];
});

//place items in knapsack
const knapsack = [];
let temp = 0;
let tempTemp = 0;
for (let i = 0; i < itemRatios.length; i++) {
  if (tempTemp === knapsack) break;
  temp += Number(itemRatios[i][1]);
  if (temp <= knapSize) {
    knapsack.push(itemRatios[i]);
  } else {
    temp = tempTemp;
  }
  tempTemp = temp;
}

//assign/compute results for logging
const itemNums = [];
let totalCost = 0;
let totalValue = 0;
knapsack.forEach((result) => {
  itemNums.push(' ' + result[0]);
  totalCost += Number(result[1]);
  totalValue += Number(result[2]);
});

const end = Date.now();
const diff = end - start;

console.log(`File ${filename} took ${(diff / 1000).toFixed(4)} seconds`);
console.log(`Results\n------\nItems:${itemNums}\ntotalCost: ${totalCost}\ntotalValue: ${totalValue}`);

return items;
