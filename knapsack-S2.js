const fs = require('fs');
const args = process.argv.slice(2);
const file = args[0];
let W = args[1].split("=")[1];

fs.readFile(`./data/`+file, 'utf8', function (err, data) {
  if (err) {
    // LOG ERROR IF UNABLE TO OPEN FILE
    return console.log(err);
  }
  
  // Values (stored in array v)
  // Weights (stored in array w)
  // Number of distinct items (n)
  // Knapsack capacity (W)

  let v = [];
  let w = [];
  let n = [];
  let result = [];
  let value = 0;


  // INDIVIDUALIZE DATA BY SPLITTING AT EACH NEW LINE
  dataArray = data.split('\n');

  // ITTERATE THROUGH EACH ARRAY SET
  // SPLIT AT SPACES AND PUSH TO SEPERATE ARRAYS
  for (let i = 0; i < dataArray.length; i++) {
    x = dataArray[i].split(" ");

    v.push(x[2]);
    w.push(x[1]);
    n.push(x[0]);
  }

  


  console.log(v);
  // console.log("Filename: " + file);
  // console.log("Result Rows: " + result);
  // console.log("Starting threshold: " + args[1].split("=")[1]);
  // console.log("Remaining threshold: " + W);
  // console.log("Total Value = " + value);
});

