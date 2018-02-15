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

  // INDIVIDUALIZE DATA BY SPLITTING AT EACH NEW LINE
  dataArray = data.split('\n');

  // ITTERATE THROUGH EACH ARRAY SET
  // SPLIT AT SPACES AND PUSH TO eArray
  for (let i = 0; i < dataArray.length; i++) {
    x = dataArray[i].split(" ");
    eArray[i] = {row: x[0], cost: x[1], value: x[2], cvr: x[2]/x[1]}
  }

  // SORT ARRAY OBJECT ARRAY BY VALUE
  eArray.sort(function(a, b) {
    return b.cvr-a.cvr;
  });

  
  
    for (let i = 0; i < eArray.length; i++) {
      // IF REMAINING THRESHOLD - 
      if (threshold - eArray[i].cost >= 0) {
        result.push(eArray[i].row);
        threshold -= eArray[i].cost;
        value += parseInt(eArray[i].value);
      }
    }

  console.log("Filename: " + file);
  console.log("Result Rows: " + result);
  console.log("Starting threshold: " + args[1].split("=")[1]);
  console.log("Remaining threshold: " + threshold);
  console.log("Total Value = " + value);
});

