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


const naiveKnapsack = (items, capacity) =>{
    const recurse = (i, size) => {
        // base case
        if (i === -1) {
            return {
                value: 0,
                size: 0,
                chosen: [],
            };
        }

        // check to see if the item fits
        else if (items[i].size > size) {
            return recurse(i - 1, size);
        }
        // Item fits, but might not be worth as much as items in there already
        else {
            const r0 = recurse(i - 1, size);
            const r1 = recurse(i - 1, size - items[i].size);

            r1.value += items[i].value;

            if (r0.value > r1.value) {
                return r0;
            } else {
                r1.size += items[i].size;
                r1.chosen = r1.chosen.concat(i+1);
                return r1;
            }
        }
    };
    return recurse(items.length - 1, capacity);
};
// console.log(naiveKnapsack(items, capacity));


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

function getResults() {

    const result = [];
    const r = {
        Value: 0,
        Size: 0,
        Chosen: []
    };
    const copyRatio = weightRatio;
    let cap = 0;
    while (cap < capacity &&  copyRatio.length !== 0) {


        let item = copyRatio.shift();
        let sum = cap + item.size;
        if (sum <= capacity) {
            // result.push(item);
            r.Value += item.value;
            r.Size += item.size;
            r.Chosen.push(item.index);
            cap += item.size;
        }


    }

    return r;
}

setup();

// // console.log(items);
// // console.log('\n');
// // console.log(weightRatio);
// // console.log('\n');
console.log(getResults());

