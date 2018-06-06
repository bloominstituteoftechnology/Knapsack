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

console.log('before sort', items)

let initial = parseInt(capacity);
let betterValue = [];
let sameValue = [];
let worseValue = [];
items.sort((a, b) => {
  //b is an index above b
  //a starts at index 1, doesn't have the last index
  //b doesn't contain the first index
  let valA = a.value/a.size;
  let valB = b.value/b.size;
  return valB - valA;
  // if ((a.value/a.size) > (b.value/b.size)) {
    //   // cost = a.size;
    //   betterValue.push(a)
    //   parseInt(cost)
    //     // return a;
    // } else if ((a.value/a.size) === (b.value/b.size)) {
      //   sameValue.push(a)
      // }
      //  else {
        //   worseValue.push(b)
        
        // cost = b.size
        // return b;
        // console.log('a value', a);
  // console.log('typeof cost:', betterValue);
  
  // console.log('cost index',parseInt(netCostValue))
});
console.log('items:', items)
// function quickSort(betterValue, left, right){
  //   var len = arr.length, 
  //   pivot,
  //   partitionIndex;
  
  
  //  if(left < right){
    //    pivot = right;
    //    partitionIndex = partition(arr, pivot, left, right);
    
    //   //sort left and right
    //   quickSort(arr, left, partitionIndex - 1);
    //   quickSort(arr, partitionIndex + 1, right);
    //  }
    //  return arr;
    // }
    // let netCostValue = ((capacity) - (cost));
    console.log('btter sort', (betterValue))
    console.log('worse sort', worseValue)
    console.log('same value', sameValue)
    
    
    const greedyAlgo = (items, initial) => {
      
      let cost = 0;
      const result = {
        value: [],
        size: [],
        chosen: []
      };
      for (i = 0; i < items.length ; i++) {
        if (initial > items[i].size) {
         result.size += items[i].size;
         result.value += items[i].value;
         result.chosen += items[i].index + ' ' ;
         initial -= items[i].size;
        }
      }


  return result;
}


console.log(greedyAlgo(items,initial))