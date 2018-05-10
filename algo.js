const fs = require('fs');
const present = require('present');

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

function greedyAlg(items,capacity){
  let list = {};
  let ratios = [];
  let current = 0;
  let answer = {
    items :[],
    size: 0,
    value: 0
    };
  for(let i = 1; i < items.length; i++){
    ratios.push(items[i].value / items[i].size);
    list[items[i].value / items[i].size] = items[i];
  }
  ratios.sort().reverse();
  for(let i = 1; i < ratios.length && current < capacity; i++){
    if(current + list[ratios[i]].size < capacity){
      current += list[ratios[i]].size;
      answer.items.push(list[ratios[i]].index);
      answer.value += list[ratios[i]].value;
    }
    else{
      break;
    }
  }
  answer.size = current;
  return answer;
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
let t0 = present();
//console.log("Naive Recursive implementation: ", naiveKnapsack(items, capacity));
t1 = present();
console.log('\ntook ' + (t1 - t0) + ' milliseconds');
t0 = present();
console.log('\ngreedy implementation', greedyAlg(items,capacity));
t1 = present();
console.log('\ntook ' + (t1 - t0) + ' milliseconds');


