const fs = require('fs');
const args = process.argv;

const knapsack = () => {

};

fs.readFile(args[2], (err, data) => {
    if(err) console.error(err);
    const threshold = parseInt(args[3].match(/(?<=--threshold=)\d+/)[0]);
    const val_weight = data.toString().split("\n");
    val_weight.pop();
    val_weight.forEach((x, i) => {
      if(val_weight[i].length !== 0 ) {
        return val_weight[i] = x.split(' ').slice(1);
      }
    })

    const table = Array(val_weight.length+1).fill(0).map(x => Array(threshold+1).fill(0));
    table[0].forEach((x, i) => table[0][i] = i);
    table.map((x, i) => {
      if(i === 0) table[i][0] = ['size', 'val'];
      if(i < table.length-1) table[i+1][0] = val_weight[i]
    });
    console.log(val_weight, val_weight.length);
    console.log(table, table.length);
});