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

let ratios = [];

items.forEach(item => {
  let temp = [];
  temp.push(item[0]);
  temp.push(parseInt(item[2]/item[1]));
  temp.push(parseInt(item[1]));
  temp.push(parseInt(item[2]));
  ratios.push(temp);
})

ratios.sort(sortFunction);

function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return 0;
  }
  return (a[1] < b[1]) ? 1 : -1;
}

let result = {};
let currentWeight = 0;
let finalWeight = 0;
let finalValue = 0;

for (let i = 0; i < ratios.length; i++) {
  if (currentWeight + (ratios[i][2]) <= threshold) {
    currentWeight += (ratios[i][2]);
    // result.push(ratios[i]);
    result[ratios[i][0]] = {};
    result[ratios[i][0]]['weight'] = (ratios[i][2]);
    result[ratios[i][0]]['value'] = (ratios[i][3]);
    finalWeight += (ratios[i][2]);
    finalValue += (ratios[i][3]);
  }
};



console.log(`Items to select: ${Object.keys(result)}`);
console.log(`Total Weight: ${finalWeight}`);
console.log(`Total Value: ${finalValue}`);

// // Input:
// // Values (stored in array v) 3rd number
// let values = [];
// items.forEach(item => {
//   values.push(parseInt(item[2]));
// })

// // Weights (stored in array w) 2nd number
// let weights = [];
// items.forEach(item => {
//   weights.push(parseInt(item[1]));
// })
// // Number of distinct items (n)
// let n = items.length;

// // Knapsack capacity (W)
// threshold = parseInt(threshold);


// const knapsack = {};

// if (args.length != 2) {
//   console.error("require correct arguments");
//   process.exit(1);
// }

// const filename = args[0];
// const threshold = args[1];

// let lineReader = require('readline').createInterface({
//   input: fs.createReadStream(filename)
// });

// lineReader.on('line', (line) => {
//   let splitLine = line.split(' ');
//   let itemInfo = [];
//   itemInfo.push(splitLine[1]);
//   itemInfo.push(splitLine[2]);
//   knapsack[splitLine[0]] = itemInfo;
// });

// lineReader.on('end', () => {
//   lineReader.close()
// });
