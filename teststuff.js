const fs = require('fs')

fs.readFile('data/small1.txt', (err, data) => {
  if (err) {
    console.error('Could not find file')
    process.exit(1)
  }
  const dataArray = data
    .toString()
    .split('\n')
    .reduce((res, item, i) => {
      if (!item) {
        return res
      }
      const line = item.split(' ') // 1, 42, 81
      res[i] = { item: line[0], size: Number(line[1]), val: Number(line[2]) }
      return res;
      console.log(res);
    }, [])
  console.log(dataArray);

  function knapsack(items, capacity) {
    var totalWeight = 0;
    var totalValue = 0;
    var sorted = items.sort(function (a, b) {
      return (b.val / b.size) - (a.val / a.size);
    });
    var index = 0;
    while (totalWeight < capacity) {
      if (totalWeight < capacity) {
        totalWeight += sorted[index].val;
      }
      index++;

      console.log(totalWeight);
      console.log(sorted[index]);
      console.log();
      // var ratio = sorted[index].val / sorted[index].size;
      // totalValue += ratio;
      // totalWeight++;
      // if (totalWeight === sorted[index].size) {
      //     index++;
      // }
    }
    console.log(totalValue);
    return totalValue.toFixed(2);
  }

  console.log(knapsack(dataArray, 100));
})

