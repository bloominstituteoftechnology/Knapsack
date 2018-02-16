const fs = require('fs');
const args = process.argv.slice(2);
const file = args[0];
let threshold = args[1].split("=")[1];

fs.readFile(`./data/`+file, 'utf8', function (err, data) {
  if (err) {
    // LOG ERROR IF UNABLE TO OPEN FILE
    return console.log(err);
  }
  
  let eArray = [];
  let result = [];
  let value = 0;

  // INDIVIDUALIZE DATA BY SPLITTING AT EACH NEW LINE AND PUSH TO NEW ARRAY
  dataArray = data.split('\n');
  eArray = data.split(/\r?\n/)
    .map((line) => line? line.split(' ').map((val) => +val) : null);
  eArray.pop();

    ////////////
    // GREEDY //
    ////////////

    // SORT ARRAY OBJECT ARRAY BY VALUE
    eArray.sort(function(a, b) {
      return (b[2]/b[1]) - (a[2]/a[1]);
    });

    for (let i = 0; i < eArray.length; i++) {
      // IF REMAINING THRESHOLD - 
      if (threshold - eArray[i][1] >= 0) {
        result.push(eArray[i][0]);
        threshold -= eArray[i][1];
        value += parseInt(eArray[i][2]);
      }
    }


    ////////////////
    // Exhaustive //
    ////////////////

    // const exhaustive = (items, capacity, value) => {
    //   if (!items.length || (items.length === 1 && items[0][1] > capacity)) {
    //     return value;
    //   } else if (items.length === 1) {
    //     value += items[0][2];
    //     return value;
    //   } else if (capacity >= items[0][1]) {
    //     return Math.max(exhaustive(items.slice(1), capacity - items[0][1],
    //     value + items[0][2]), exhaustive(items.slice(1), capacity, value))
    //   } else {
    //     return exhaustive(items.slice(1), capacity, value);
    //   }
    // };

  // GREEDY FINISH
  console.log("Filename: " + file);
  console.log("Result Rows: " + result);
  console.log("Starting threshold: " + args[1].split("=")[1]);
  console.log("Remaining threshold: " + threshold);
  console.log("Total Value = " + value);
  
  // EXHAUSTIVE CALL
  // console.log(exhaustive(eArray, threshold, 0));
});

