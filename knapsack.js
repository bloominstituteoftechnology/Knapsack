const fs = require('fs');

// Solo partial completion before solution lecture
const greedyAlgoSolo = (items, capacity) => {
  // Track size, value, and indecies of chosen items
  let size = 0, value = 0, chosen = [];
  // Sort based on size/value ratio
  const sorted = items.slice().sort(((a, b) => {
    return (b.value / b.size) - (a.value / a.size);
  }));
  // Loop through sorted array
  for(item of sorted) {
    // Check if item.size will break capacity
    if(size + item.size <= capacity) {
        chosen.push(item.index);
        size += item.size;
        value += item.value;
    }
  }

  return `Value: ${value}, Size: ${size}, Chosen: ${chosen}`;
}


const argv = process.argv.slice(2);

if (argv.length != 2) {
  console.error("usage: filename capacity");
  process.exir(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Reads the file
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

// console.log(greedyAlgo(items, 100));
// console.log(greedyAlgoSolo(items, 100));

console.log(naiveKnapsack(items, capacity));