const fs = require("fs");
const path = require("path");
const readline = require("readline");

const args = process.argv.slice(2);

let fileName = args[0];
let threshold = args[1];

let dataArray = [];

if (args.length !== 2) {
  console.log("usage: put an input file and a threshold");
  process.exit(1);
}

let rl = readline.createInterface({
  input: fs.createReadStream(args[0])
});

rl.on("line", line => {
  let [index, cost, value] = line;
  console.log(index, cost, value);
  console.log(line);
});

//foreach line save it as an object inside an array

//make a new column equal to column 3 minus column 2

//then sort the new column, and sort it descending

//Use column 2 as index and keep adding the new column until column 2 is equal to the threshold
