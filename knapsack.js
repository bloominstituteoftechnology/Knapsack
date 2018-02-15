const fs = require('fs');

const args = process.argv.slice(2);

const regex = /\d+/g;

const threshold = parseInt(regex.exec(args[1])[0]);

if (args.length != 3) {
    console.error("usage: extractlink inputfile");
    process.exit(1);
}

const filename = args[0];

const method = args[2];

const text = fs.readFileSync(filename, {encoding: "utf8"});

const data = text.split('\n');

let counter = 0;

data.map((item) => {
    data[counter] = item.split(' ');
    counter++;
})

counter = 0;

let highestVal = 0;
let highestItems = [];
let highestWeight = 0;

function sort(arr) {
    for(let i = 0; i < arr.length; i++){
      let tempVal = arr[i][3];
      let tempItem = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j][3] < tempVal) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = tempItem;
    }
    return arr;
}

if (method === '--greedy') {
    data.map((item) => {
        for (let i = 0; i <= 2; i++) {
            item[i] = parseInt(item[i]);
        }
        let diff = item[2] - item[1];
        item.push(diff);
    })

    sort(data);

    for (let i = 0; i < data.length; i++) {
        if ((highestWeight + data[i][1]) > 100) {
            break;
        } else {
            highestItems.push(data[i][0]);
            highestVal += data[i][2];
            highestWeight += data[i][1];
        }
    };
}

console.log(`The items to take are ${highestItems.join(', ')}, with a value of ${highestVal} and a weight of ${highestWeight}`);


