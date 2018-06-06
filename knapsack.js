const fs = require('fs');

//Naive Recursive Approach
function naiveKnapsack(items, capacity) {
    function recurse(i, size) {
        //base case
        if (i === 0) {
            return {
                value: 0, 
                size: 0, 
                chosen: []
            };
        }
        //check to see if items fit
        else if (items[i].size > size) {
            return recuse(i - 1, size); 
        }
        //item fits, but might not be worth as much as current values
        else {
            const r0 = recurse(i-1, size); 
            const r1 = recurse(i - 1, size - items[i].size); 
       
            r1.value += items[i].value; 
             
            if (r0.value > r1.value) {
                return r0; 
            } else {
                r1.size += items[1].size; 
                r1.chosen = r1.chosen.concat(i); 
                return r1; 
            }
        }
    }
    return recurse(items.length - 1, capacity);
}

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
const items = []
    
for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));

  items.push({
    index: index,
    size: size,
    value: value,
    score: parseInt((value/size))
  });
}

const moreItems = items.filter(item => item.size <= capacity); 

const scoreItems = moreItems.sort((a, b) => b.score - a.score);

const knapsack = (scoreItems, capacity) => {
    let knapsackItems = []; 
    for (let i = 0; i < scoreItems.length; i++) {
        if (scoreItems[i].size < capacity) {
            capacity -= scoreItems[i].size; 
            knapsackItems.push(scoreItems[i]); 
        }
    }
    return knapsackItems; 
}
console.log(knapsack(scoreItems, capacity)); 
