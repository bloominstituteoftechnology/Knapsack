const fs = require("fs");
const path = require("path");
const rl = require("readline");

const args = process.argv.slice(2);

if (args.length != 2) {
  console.error("usage: knapsack filename maxsize");
  process.exit(2);
}

let [filename, maxsize] = args;
const filePath = path.resolve(__dirname, filename);

fs.readFile(filename, (err, data) => {
  if (err) {
    console.error("Couldn't find file");
    process.exit(1);
  }

  const inventory = data
    .toString()
    .split("\r\n")
    .reduce((items, item, index) => {
      if (item) {
        const [id, cost, value] = item.split(" ");
        const effeciency = Math.round(value / cost * 10) / 10;
        items[index] = { id, cost, value, effeciency };
      }
      return items;
    }, []);
  inventory.sort((a, b) => {
    return parseFloat(b.effeciency) - parseFloat(a.effeciency);
  });
  console.log(inventory);
});

if (isNaN(maxsize)) {
  console.error(`Knapsack size must be a number!`);
  process.exit(2);
}
