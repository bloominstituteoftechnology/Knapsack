const fs = require('fs');

function naiveKnapsack(items, capacity) {
  items.sort((a,b) => {
    return (a.size/a.value) - (b.size/b.value);
  });
  
  let chosen = [];
  let totalSize = 0;
  let totalValue = 0;

  items.forEach(item => {
    let room = capacity - totalSize;
    if (item.size < room) {
      chosen.push(item);
      totalSize += item.size;
      totalValue += item.value;
    } else if (item.size < capacity){
      let toBeRemoved = 0;
      let removedValue = 0;
      let removedWeight = 0;
      //take out from knapsack and compare to next item
    }
  }); console.log(totalSize+totalValue);
  return (chosen);
}

const argv = process.argv.slice(2);

// add an error check to check the number of params
if (argv.length != 2) {
  console.error('usage: [filename] [capacity]');
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

// read the file that was passed to our program

const filedata = fs.readFileSync(filename, 'utf8');

const lines = filedata.trim().split(/[\r\n]+/g);

// process the lines 

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(' ').map(n => parseInt(n));
  
  items[index] = {
    index,
    size,
    value,
  };
}

console.log("Real good implementation: ", naiveKnapsack(items, capacity));