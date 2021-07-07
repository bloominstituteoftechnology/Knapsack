const fs = require('fs');

const exhaustive = () => {
};

const greedy = (items, capacity, total, arr) => {

  const sort = items.map(each => {
    return {
      items: each[0],
      weight: each[1],
      value: each[2],
      valByWeight: each[2] / each[1]
    }
  }).sort((a, b) => b.valByWeight - a.valByWeight);

  for (let item of sort) {
    if (item.weight <= capacity) {
      capacity -= item.weight;
      total += item.value;
      arr.push(item.items);
    }
  }
  return { total, capacity, arr }
};


//----------------------------
//         Read File
//----------------------------

function readFile() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('usage: extractlinks inputfile followed by threshold');
    process.exit(1);
  }

  const filename = args[0];
  const data = fs.readFileSync(`./data/${filename}`, 'utf-8');
  const capacity = parseInt(process.argv[3]);
  let items = data.trim().split('\n').map(each => each.split(' '));
  items = items.map(each => [Number(each[0]), Number(each[1]), Number(each[2])]);
  console.log('items: ', items);
  console.log('Capacity: ', capacity);

  let greedyOutput = greedy(items, capacity, 0, []);
  console.log(
    `\n`
    + `   -Greedy-\n`
    + `   Value: ${greedyOutput.total}\n`
    + `   Weight: ${process.argv[3] - greedyOutput.capacity}\n`
    + `   Items: ${greedyOutput.arr}\n`
    + `   All Items: ${items}\n\n`
  );
}

readFile();