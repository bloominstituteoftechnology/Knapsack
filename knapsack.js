const fs = require('fs');

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

/* =========== Main ============= */

const args = parseArguements()

const items = getAllItemsFromFile(args.filename, args.capacity);

fillKnapsackByGreedy(items, args.capacity);


/* =========== Functions ============= */

function parseArguements() {
  const argv = process.argv.slice(2);

  if (argv.length != 2) {
    console.error("usage: filename capacity");
    process.exit(1);
  }

  return {
    filename: argv[0],
    capacity: parseInt(argv[1])
  }
}

function getAllItemsFromFile(filename, capacity) {

  // Read the file
  const filedata = fs.readFileSync(filename, "utf8");
  // Split the filedata on each new line
  const lines = filedata.trim().split(/[\r\n]+/g);

  // Process the lines
  const items = [];

  for (let l of lines) {
    const [index, size, value] = l.split(" ").map(n => parseInt(n));

    if (size > capacity) continue;

    items.push({
      index: index,
      size: size,
      value: value,
      score: value / size
    });
  }

  return items;
}

function fillKnapsackByGreedy(items, capacity) {
  let totalValue = 0;
  let totalSize = 0;
  let indexList = [];

  items.sort(compareScore).forEach( item => {
    if (totalSize + item.size <= capacity) {
      totalValue += item.value;
      totalSize += item.size;
      indexList.push(item.index);
    }
  });

  console.log('Greedy');
  console.log(`Value: ${totalValue}`);
  console.log(`Size: ${totalSize}`);
  console.log(`Chosen: ${indexList}`);

  function compareScore(a, b) {
    if (a.score > b.score) return -1; 
    if (a.score < b.score) return 1; 
    return 0;
  }
}
