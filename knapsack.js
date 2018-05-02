const fs = require('fs');
const filename = process.argv[2] + '';

//get knapsack size
let knapSize = process.argv[3];
const cmdRegEx = /\d{1,10}/;
knapSize = knapSize.match(cmdRegEx)[0];

//push items into array
const file = fs.readFileSync(filename, 'binary').split('\n');
let items = [];
file.forEach((item) => {
  items.push(item);
});

let itemRatios = [];
//add ratios to items (probably should have used map or something instead...)
const itemRegEx = /(\d{1,2})\s(\d{1,2})\s(\d{1,2})/;
items.forEach((item, index) => {
  //last line of every file is a blank line
  if (item.length) {
    let itemGrouping = item.match(itemRegEx);
    let tempCost = itemGrouping[2]; // item weight/size
    let tempValue = itemGrouping[3]; // item value
    let tempRatio = itemGrouping[2] / itemGrouping[3];
    itemRatios.push([itemGrouping[1], tempCost, tempValue, tempRatio]);
  }
});

//sort ratios in descending order
itemRatios.sort((a,b)=> {
    return a[3] < b[3];
});

 
return items;
