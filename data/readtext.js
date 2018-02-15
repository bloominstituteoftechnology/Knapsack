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
  
  dataArray.sort((a, b) => (b.value / b.cost) - (a.value / a.cost));
/**
  * KnapSac Problem
  */
  let totalCost = 0;
  let totalValue = 0;
  const pack = [];
  for (let i = 0; i < dataArray.length; i++) {
    const {index, cost, value} = dataArray[i];
    // console.log(dataArray.length, i, threshold, cost)
    if (totalCost + Number(cost) < threshold) {
      totalCost += Number(cost);
      totalValue += Number(value);
      pack.push(index);
    }
  }
  console.log(`
    Items to select: ${pack.sort((a, b) => a - b).join(', ')}
    Total cost: ${totalCost}
    Total value: ${totalValue}`
  );
});
