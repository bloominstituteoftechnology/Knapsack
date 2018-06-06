const fs = require('fs');

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const argv = process.argv.slice(2);

if (argv.length != 2) {
    console.error("usage: filename capacity");
    process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Read the file
const filedata = fs.readFileSync(filename, "utf8");
// Split the filedata on each new line
const lines = filedata.trim().split(/[\r\n]+/g);

// Process the lines
const items = [];

for (let l of lines) {
    const [index, size, value] = l.split(" ").map(n => parseInt(n));

    items.push({
        index: index,
        size: size,
        value: value,
    });
}
/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const filtered = items.filter(item => item.size < capacity);

for(item of filtered) {
    const score =  item.value/item.size;
    const temp = Object.assign(item, {score})
}

filtered.sort((a, b) => b.score - a.score);

let size = 0
let value = 0;
const chosen = [];
let tracker = capacity;

for(item of filtered) {
    if(size <= capacity && tracker >= item.size) {
        tracker -= item.size;
        size += item.size;
        value += item.value;
        chosen.push(item.index);
    }
}
console.log( { size, value, chosen })
