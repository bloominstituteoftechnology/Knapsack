const fs = require("fs");

const args = process.argv.slice(2);

const file = args[0];
const threshold = args[1];

if (!file || !threshold) {
  console.log('usage: node index.js <input> --capacity=##')
  process.exit(1);
}

fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    // if you can't find the file, log error message and exit
    console.error("could not find file");
    process.exit(1);
  }
  const items = data
    .toString()
    .split("\n")
    .reduce((res, item, i) => {
      //console.log("item ->", item, "res ->", res);
      if (!item) {
        return res;
      }
      const line = item.split(" ");
      res[1] = { item: line[0], weight: Number(line[1]), value: Number(line[2]) };
      return res;
    }, [{index: 0}]);


// function to create a matrix to store our values in - javascript the good parts
Array.matrix = function(numrows, numcols, initial) {
  // initialize the initial array
  const arr = [];
  // iterate through that array while i is less than the requested number of rows
  for (let i = 0; i < numrows; i++) {
    // initialize the initial secondary array
    const columns = [];
    // iterate through the columns until all the requested columns have been added
    for (let j = 0; j < numcols; j++) {
      // fill the secondary array's with the specified values
      columns[j] = initial;
    }
    // array index = columns values
    arr[i] = columns;
  }
  // return the array
  return arr;
};

// the knapsack section
function indianaJones(items, capacity = 100) {
  // first sort the array into ascending weights
  items.sort(function(a, b) {
    return a.weight - b.weight;
  });

  // initialize the array to rows = qty of items, colums = holding capacity, fill with 0's
  let t = Array.matrix(items.length, capacity, 0);
  let newItems = [];

  // i=rows j=columns - iterate through the matrix
  for (let i = 1; i < items.length; i++) {
    for (let j = 0; j < capacity; j++) {
      // if the item doesn't fit, take the item from the preceeding row
      if (items[i].weight > j) {
        t[i][j] = t[i - 1][j];

        // otherwise, take the greater of the current item PLUS the items available with the remaining weight, or the preceeding items
      } else {
        t[i][j] = Math.max(
          items[i].value + t[i - 1][j - items[i].weight],
          t[i - 1][j]
        );
      }
    }
  }

  // let i = items.length-1, j = capacity-1;
  // while (i > 0 && j > 0) {
  //   if (t[i][j] !== t[i-1][j]) {
  //     newItems.push(items[i].index);
  //     i--;
  //     j-(items[i].weight);
  //   } else {
  //     --i;
  //   }
  // newItems.sort(function(a,b){
  //   return a - b;
  // });
  // newItems.length-1;
  // }

  console.log(`Final value: ${t[items.length - 1][capacity - 1]}`);
}
});