const fs = require('fs');

const argv = process.argv.slice(2);

if (argv.length != 2) {
    console.error("usage: filename capacity");
    process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

const filedata = fs.readFileSync(filename, "utf8");

const lines = filedata.trim().split(/[\r\n]+/g);

const items = [];

for (let l of lines) {
    const [index, size, value] = l.split(" ").map(n => parseInt(n));
  
    items.push({
      index: index,
      size: size,
      value: value,
    });
  }
//GOAL: FIND THE GREATEST VALUE WITH A WEIGHT UNDER CAPACITY
  function greedyPoo(items, capactiy) {
    var resultsGreed = [];
    var sorter = items.sort(function(a,b) {
        return (b.value/b.size) - (a.value/ a.size);
    });
  }

  console.log(greedyPoo(items));