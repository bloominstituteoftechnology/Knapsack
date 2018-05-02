const fs = require("fs");
const path = require("path");
const readline = require("readline");

const args = process.argv.slice(2);

let filename = args[0];
let threshold = args[1];

if (args.length !== 2) {
  console.log("usage: put an input file and a threshold");
  process.exit(1);
}

// let rl = readline.createInterface({
//   input: fs.createReadStream(args[0])
// });

// rl.on("line", lines => {
//   const [index, size, value] = lines.split(/\s+/);
//   items.push({
//     index: Number(index),
//     size: Number(size),
//     value: Number(value)
//   });
// });

// console.log(items);

const capacity = args[1];
const filedata = fs.readFileSync(filename, "utf8");
const lines = filedata.trim().split(/[\rn\n]+/);
const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(/\s+/).map(n => parseInt(n));
  items[index] = {
    index: index,
    size: size,
    value: value
  };
}

console.log(items);
