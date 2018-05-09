const fs = require('fs');

function naiveKnapsack(items, capacity) {
  // what is the value we have when we don't pick up any items
  // value[0, w] = 0
  // value[i, w] = value[i-1, w] if W[i] > w
  
  // recursive solution
  function recurse(i, size) {
    // base case
    if (i == 0) {
      return {
        value: 0,
        size: 0,
        chosen: []
      };
    }

    // how do we move towards our base case?
    // recurse(items.length, capacity)
    // recurse(items.length - 1, capacity)
    // recurse(items.length - 2, capacity)

    // Pick up an item
    // case: item doesn't fit
    
    else if (items[i].size > size) {
      return recurse(i - 1, size);
    }

    // case: item does fit, but it might not be worth
    // as much as the sum of values of items we currently
    // have in our bag
    else {
      // the max value we've accumulated so far 
      const r0 = recurse(i - 1, size);
      // the max value we could have if we added the new item we picked
      // but evicted some others
      const r1 = recurse(i - 1, size - items[i].size);

      r1.value += items[i].value;

      if (r0.value > r1.value) {
        return r0;
      } else {
        r1.size += items[i].size;
        r1.chosen = r1.chosen.concat(i);
        return r1;
      }
    }
  }

  return recurse(items.length - 1, capacity);
}

function smartKnapsack(items, capacity) {
  //fill array with items that you can carry and their ratio
  //fill from best ratio first
  //if doesn't fit go to next one
  //if bag isn't full by end start from index 1

  const analyzedItems = [];

  for (let i = 1; i < items.length; i++) {
    if (items[i].size < capacity) {
      //put into array (can optimize w/ data structure, maybe max heap)
      analyzedItems.push({ ...items[i], svRatio: items[i].value / items[i].size, })
    }
  }
  
  analyzedItems.sort((b, a) => parseFloat(a.svRatio) - parseFloat(b.svRatio));

  const knapsack = {
    value: 0,
    size: 0,
    chosen: []
  };

  // exhaustive answer: for loop that pushes (i, where i = 0) then fills sack
  //if sack.size > capacity, starts again on (i++)

  knapsack.chosen.push(analyzedItems[0].index);
  knapsack.value = knapsack.value + analyzedItems[0].value;
  knapsack.size = knapsack.size + analyzedItems[0].size;

  for (let i = 1; i < analyzedItems.length; i++) {
    if (analyzedItems[i].size + knapsack.size <= capacity) {
      knapsack.chosen.push(analyzedItems[i].index);
      knapsack.value = knapsack.value + analyzedItems[i].value;
      knapsack.size = knapsack.size + analyzedItems[i].size;
    }
  }

return knapsack;
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

//console.log("Naive Recursive implementation: ", naiveKnapsack(items, capacity));
console.log("Smart implementation: ", smartKnapsack(items, capacity));