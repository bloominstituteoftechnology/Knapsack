const fs = require("fs");

const args = process.argv.slice(2);

if (args.length != 2) {
  console.error("usage: knapsack filename sack-size");
  process.exit(2);
}

const sackSize = (parseInt(args[1], 10));

if (!Number.isInteger(sackSize)) {
  console.error("sack-size must be an integer!");
  process.exit(2);
}

const file = fs.readFileSync(`./data/${args[0]}`, 'utf8', (err, fd) => {
  if (err) throw err;
});//.split('\n');

console.log(file);