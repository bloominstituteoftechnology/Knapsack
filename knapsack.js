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
  function greedyPoo(items) {
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
  const memoize = (fn) => {
    let cache = {};
      return (...args) => {
          let n = args[0];
          if (n in cache) {
              console.log('Fetching from cache');
              return cache[n];
          }
          else {
              console.log('Calculating result');
              let result = fn(n);
              cache[n] = result;
              return result;
          }
      }
  }
  function recursive(items, capacity) {
    function recurse(i, size) {
         const Cache = {
          value: 0,
          size: 0,
          chosen: []
      };
        if ( i === -1) {
            return {
                value: 0,
                size: 0,
                chosen: []
            };
        }
        else if(items[i].size > size) {
            return recurse(i-1, size);
        }
        else{
            const r0 = recurse(i-1, size);
            const r1 = recurse(i-1, size - items[i].size);

            r1.value += items[i].value;
            if(r0.value > r1.value) {
                return r0;
            }else {
                r1.size += items[i].size;
                r1.chosen = r1.chosen.concat(i + 1);
                return r1;
            }
        }
    }
    return recurse(items.length -1, capacity);
  }

  function iterativeFoo(items, capacity) {
  }
  const memoizedKnap = memoize(recursive);
  console.log(memoizedKnap(items, capacity))
  console.log(greedyPoo());
  console.log(recursive(items, capacity));