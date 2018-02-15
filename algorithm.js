const fs = require('fs');

function largestDifference(arr) {
  let largest = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if ((arr[j]-arr[i]) > largest) {
        largest = arr[j]-arr[i];
      }
    }
  }
  return largest;
}

fs.readFile('./data/small1.txt', (err, data) => {
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
    }, [])
    console.log(dataArray[2].size);
  })
// console.log(res);
// console.log(split.length);
// console.log(typeof(text));
// text.forEach(item => console.log(item));