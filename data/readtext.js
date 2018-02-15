const fs = require('fs');

/**
 * Get input info
*/
const file = process.argv[2];
const threshold = Number(/--threshold=([0-9]+)/.exec(process.argv[3])[1]);

if (!file || !threshold) {
  console.log('usage: node readText.js <input> --threshold=###')
  process.exit(1);
}

/**
 * Read file
 */
fs.readFile(file, (err, data) => {
  if (err) { // error handling
    console.error('Couldn\'t find file');
    process.exit(1);
  }
  /**
   * Parse file
  */
  const dataArray = data
    .toString()
    .split('\r\n')
    .reduce((m, c, i) => {
      if (c) {
        const [index, cost, value] = c.split(' ');
        m[i] = { index, cost, value };
      }
      return m;
    }, []);
  
  console.log(dataArray);
  dataArray.sort((a, b) => (b.value / b.cost) - (a.value / a.cost));
  console.log(dataArray);
  let totalCost = 0;
  let pack = [];
  for (let i = 0; i < dataArray.length; i++) {
    const {index, cost} = dataArray[i];
    console.log(dataArray.length, i, threshold, cost)
    if (totalCost + Number(cost) < threshold) {
      totalCost += Number(cost);
      pack.push(dataArray[i]);
    }
  }
  console.log(pack);
});

/**
 * KnapSac Problem
 */
/*
The maximum weight W
The number of items n
for w = 0 to W do 
   c[0, w] = 0 
for i = 1 to n do 
   c[i, 0] = 0 
   for w = 1 to W do 
      if wi ≤ w then 
         if vi + c[i-1, w-wi] then 
            c[i, w] = vi + c[i-1, w-wi] 
         else c[i, w] = c[i-1, w] 
      else 
         c[i, w] = c[i-1, w]
*/