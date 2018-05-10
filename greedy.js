const fs = require('fs');

if (process.argv.length < 3) {
  console.log(`Filename not provided`);
  process.exit(1);
}

const filename = process.argv[2];
const items = [];

const fileReading = fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err;
  let output = data.split(/\r\n/);
  output.forEach(string => {
    let splitString = string.split(/ /);
    let pushObj = {
      name: splitString[0],
      weight: parseInt(splitString[1]),
      value: parseInt(splitString[2])
    };
    items.push(pushObj);
  });

  main(100);
});

const main = W => {
  let knapSack = items

    .sort(function(item1, item2) {
      let itemValue1 = item1.value / item1.weight;
      let itemValue2 = item2.value / item2.weight;
      return itemValue1 < itemValue2 ? 1 : -1;
    })

    .reduce(function(knapSack, item) {
      let currentKnapSackWeight = knapSack.reduce(function(weight, item) {
        weight += item.weight;
        return weight;
      }, 0);
      if (currentKnapSackWeight + item.weight < W) {
        knapSack.push(item);
      }
      return knapSack;
    }, []);

  let knapSackWeight = knapSack.reduce(function(weight, item) {
    weight += item.weight;
    return weight;
  }, 0);

  let knapSackValue = knapSack.reduce(function(value, item) {
    value += item.value;
    return value;
  }, 0);

  console.log(`Capacity: ${knapSackWeight}`);
  console.log(`Value: ${knapSackValue}`);
  console.log(`Chosen: ${knapSack.map(item => item.name).join(', ')}`);
};
