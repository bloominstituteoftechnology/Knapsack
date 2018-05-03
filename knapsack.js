const fs = require('fs');
const args = process.argv;

const knapsack = (items, table) => {
  for (let i = 1; i <= items.length; i++) {
    for (let j = 0; j <= table[0].length - 1; j++) {

      if (items[i - 1][0] > j) {

        table[i][j] = table[i - 1][j];

      } else {

        table[i][j] = Math.max(
          table[i - 1][j],
          table[i - 1][j - items[i-1][1]] + items[i-1][0]
        );
        
      }
    }
  }
  return table;
};

fs.readFile(args[2], (err, data) => {
  if (err) console.error(err);
  const threshold = parseInt(args[3].match(/(?<=--threshold=)\d+/)[0]);
  const val_weight = data.toString().split('\n');
  val_weight.pop();
  val_weight.forEach((x, i) => {
    if (val_weight[i].length !== 0) {
      return val_weight[i] = x.split(' ').slice(1).map(x => parseInt(x));
    }
  });

  const table = Array(val_weight.length + 1)
    .fill(0)
    .map((x) => Array(threshold + 1).fill(0));
  table[0].forEach((x, i) => (table[0][i] = i));

  console.log(knapsack(val_weight, table));
});
