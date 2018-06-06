const fs = require('fs');

const argv = process.argv.slice(2);

if(argv.length != 2) {
    console.log('usage: filename capacity');
    process.exit();
}

const fileName = argv[0];
const capacity = argv[1];

const fileData = fs.readFileSync(fileName, 'utf8');
const lines = fileData.trim().split(/[\r\n]+/g);

const items = [];

for (let line of lines) {

    const [index, size, value] = line.split(" ").map(n => parseInt(n));

    items.push( {
        index: index,
        size: size,
        value: value
    });
}

const weightRatio = [];

function setup() {

    for (let item of items) {

        const newItem = {
            index: item.index,
            ratio: item.value / item.size,
            size: item.size,
            value: item.value
        };

        weightRatio.push(newItem);
    }

    weightRatio.sort(function (a, b) {

        return b.ratio - a.ratio;

    });
}

function getResulust() {

    const result = [];
    const copyRatio = weightRatio;
    let cap = 0;
    while (cap < capacity) {

        let item = copyRatio.shift();
        if (cap + item.size > capacity) break;

        result.push(item);
        cap += item.size;
    }

    return result;
}

setup();

// console.log(items);
// console.log('\n');
// console.log(weightRatio);
// console.log('\n');
console.log(getResulust());

