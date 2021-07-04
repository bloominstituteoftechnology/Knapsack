const fs = require('fs');
const args = process.argv;

const knapsack = (items, table) => {
  const capacity = table[0].length - 1;

  for (let i = 1; i <= items.length; i++) {
    for (let j = 0; j <= capacity; j++) {

      if (items[i][0] > j) {
        table[i][j] = table[i - 1][j];
      } else {
        table[i][j] = Math.max(
          table[i - 1][j],
          table[i - 1][j - items[i][0]] + items[i][1]
        );
      }

    }
  }
  return table;
};

// const val_weight = [
//   [42, 81],
//   [42, 42],
//   [68, 56],
//   [68, 25],
//   [77, 14],
//   [57, 63],
//   [17, 75],
//   [19, 41],
//   [94, 19],
//   [34, 12],
// ];
// const dyn_table = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

// knapsack(val_weight, dyn_table);

fs.readFile(args[2], (err, data) => {
  if (err) console.error(err);
  const threshold = parseInt(args[3].match(/(?<=--threshold=)\d+/)[0]);
  const val_weight = data.toString().split('\n');
  val_weight.pop();
  val_weight.forEach((x, i) => {
    if (val_weight[i].length !== 0) {
      return (val_weight[i] = x
        .split(' ')
        .slice(1)
        .map((x) => parseInt(x)));
    }
  });

  const table = Array(val_weight.length + 1)
    .fill(0)
    .map((x) => Array(threshold + 1).fill(0));
  table[0].forEach((x, i) => (table[0][i] = i));
  // console.log(table, val_weight);
  console.log(knapsack(val_weight, table));
});
