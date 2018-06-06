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

  const ratioStuff = e => {
      const total = e.size/e.value
      return Object.assign({}, e, {total})
  }
  const greedItems = items.map(e => ratioStuff(e));

  const sortedStuff = greedItems => {
      const rat = greedItems.map(item => {
          return {
              ...item,
              total: item.size/item.value
          }
      })
      return rat.sort((a,b) => a.total - b.total)
  }
//GOAL: FIND THE GREATEST VALUE WITH A WEIGHT UNDER CAPACITY
  function greedyPoo(items, capacity) {
    var resultsGreed = [];
    let currentSize = 0;
    let currentValue = 0;
   
    sortedStuff(greedItems).forEach(item => {
        if(currentSize + item.size <= capacity) {
            resultsGreed.push(item.index);
            currentSize += item.size;
            currentValue += item.value;
        } 
    })
    return {resultsGreed, currentSize, currentValue};
  }

  function recursive(items, capacity) {

  }

  function iterativeFoo(items, capacity) {
  }

  console.log(greedyPoo());