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
  function recursive(items, capacity) {
    function recurse(i, size) {
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
  function memoizedKnapsack(items, capacity) {
    // console.log(items.length, capacity);
    // initalize cache (in this, it will be a matrix)
    const cache = Array(items.length);
  
    // add the second dimension
    for (let i = 0; i < items.length; i++) {
      cache[i] = Array(capacity + 1).fill(null);
    }
  
    function recurseMemo(i, capacityLeft) {
      if (i === -1) {
        return {
          value: 0,
          size: 0,
          chosen: [],
        };
      }
  
      let value = cache[i][capacityLeft];
  
      if (!value) {
        value = recurseNaive(i, capacityLeft);
        cache[i][capacityLeft] = Object.assign({}, value);    // make a copy
      }
  
      return value;
    }
  
    function recurseNaive(i, capacityLeft) {
      if (i === -1) {
        return {
          value: 0,
          size: 0,
          chosen: [],
        };
      }
      // check to see if the item fits
      else if (items[i].size > capacityLeft) {
        return recurseMemo(i - 1, capacityLeft);
      }
      // Item fits, but might not be worth as much as items in there already
      // But is it worth taking? Does it positively affect our value?
      else {
        // The value we get from not taking the item
        const r0 = recurseMemo(i - 1, capacityLeft);
        const r1 = recurseMemo(i - 1, capacityLeft - items[i].size)
  
        r1.value += items[i].value;
  
        if (r0.value > r1.value) {
          return r0;
        } else {
          r1.size += items[i].size;
          r1.chosen = r1.chosen.concat(items[i].index);
          return r1;
        }
      }
    }
    return recurseMemo(items.length - 1, capacity); 
  }

  function iterativeFoo(items, capacity) {
  }
  console.log(memoizedKnapsack(items, capacity))
  console.log(greedyPoo());
  console.log(recursive(items, capacity));