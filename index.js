var fs = require('fs');

let items = [];

let index = 0;
let size = 0;
let value = 0;

const combinations = (a,m) => {
    var gc = function(a) {
      var fn = function(n, src, got, all) {
        if (n == 0) {
          if (got.length > 0) {
            all[all.length] = got;
          }
          return;
        }
        for (var j = 0; j < src.length; j++) {
          fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
      }
      var all = [];
      for (var i = 0; i < a.length; i++) {
        fn(i, a, [], all);
      }
      all.push(a);
      return all;
    }
    var c = gc(a);
    return c.filter(function(e) {
      var n = e.length;
      var sum = 0;
      while(n--)
        sum += parseFloat(e[n]) || 0;
      return sum<=m;
    },m);
  }

  /**
   * GOAL
   * 
   * Create an algo that takes gives that selects items that give the best payout
   * without going above the give threshold
   */

   const howMuchCanITake = (threshold, url) => {
    let thingsICanTake = {itemsToSelect: [], totalSize: '', totalValue: ''};
    let items = [];
    let tempSizeArr = [];
    let tempValueArr = [];
    let results = [];
    let indices = [];
    let indicesSoFar = [];
    let sizes = [];
    let sizesSoFar = [];
    let values = [];
    let totalSizes = [];
    let data = fs.readFileSync(url, 'utf8');
    data = data.split('\n');
    let dataItems = [];
    data.forEach((item) => {
        dataItems.push(item.split(' '));
    })
    for (let i = 0; i < dataItems.length; i++) {
        index = dataItems[i][0];
        size = dataItems[i][1];
        value = dataItems[i][2];
        items.push({index: index, size: size, value: value});
    }
    let sortedBySize = items.slice().sort(function(a, b) {
        return a.size - b.size;
    });
    let sortedByValue = items.slice().sort(function(a, b) {
        return a.value - b.value;
    });
    
    for (let i = 0; i < sortedBySize.length; i++) {
        tempSizeArr.push(sortedBySize[i].size);
    }
    for (let i = 0; i < sortedBySize.length; i++) {
        tempValueArr.push(sortedBySize[i].value);
    }
    results = combinations(tempSizeArr, threshold);
    for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < results[i].length; j++) {
            indicesSoFar.push(tempSizeArr.indexOf(results[i][j]));
        }
        indices.push(indicesSoFar);
        indicesSoFar = [];
    }
    for (let i = 0; i < indices.length; i++) {
        for (let j = 0; j < indices[i].length; j++) {
            sizesSoFar.push(Number(tempValueArr[indices[i][j]]));
        }
        sizes.push(sizesSoFar);
        sizesSoFar = [];
    }
    for (let i = 0; i < sizes.length; i++) {
            totalSizes.push(sizes[i].reduce((a,b) => a + b))
            
            
        }
        thingsICanTake.totalValue = Math.max(...totalSizes);
        thingsICanTake.itemsToSelect = results[totalSizes.indexOf(Math.max(...totalSizes))];
        thingsICanTake.totalSize = thingsICanTake.itemsToSelect.reduce((a, b) => Number(a) + Number(b), 0);

        return thingsICanTake;
        
   };

  

console.log(howMuchCanITake(100, '/Users/kingatoki/Desktop/Knapsack/data/small3.txt'))


