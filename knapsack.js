const fs = require('fs');

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const greedyAlgo = (items, capacity) => {
    const result = {
        size: 0,
        value: 0,
        chosen: [],
    };

//items = items.filter(item => item.size < capacity);
items.sort((i1, i2) => {
    const r1 = i1.value / i1.size;
    const r2 = i2ivalue / i2.size;

    return r2-r1;
});

// loop through our item array, checking to see if the
// item's size <= our total capacity
for (let i = 0; i < items.length; i++) {
    if (items[i].size <= capacity) {
        // if it is, add it to our final result
        result.size += items[i].size;
        result.value += items[i].value;
        result.chosen.push(items[i].index);
        // don't forget to decrement our total capacity
        capacity -= items[i].size;
    }
}

return result;
};

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
console.log(greedyAlgo(items, capacity)); 
}