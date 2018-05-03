const fs = require('fs');

const args = process.argv.slice(2);

if (args.length != 2) {
    console.error("usage: knapsack infile capacity");
    process.exit(1);
}

const filename = args[0];
const capacity = args[1];

const filedata = fs.readFileSync(filename, "utf8");

const lines = filedata.trim().split(/[\r\n]+/);

const items = [];

for (let l of lines) {
    const [index, weights, value] = l.split(/\s+/).map(n => parseInt(n));

    items[index] = {
        index: index,
        size: weights,
        value: value
    };
}

console.log(items);

function knapsack (values, size, index){
    let load = 0;
    let i = 0;
    let w = 0;
    while (load < index && i < 100) {
        if(size[i] <= (index - load)) {
            w += size[i];
            load += size[i];
        } else {
            let r = (index - load) / size[i];
            w += r * values[i];
            load += size[i];
        }
        ++i;
    }
    return w;
}
// function timedRun(name, f, items, capacity) {
//     let t0 = Date.now();
//     let result = f(items, capacity);
//     let t1 = Date.now();
//     let td = t1 - t0;

//     console.log("Function: " + name);
//     console.log("Time: " + (td / 1000).toFixed(4));
//     console.log("Size: " + result.size);
//     console.log("Value: " + result.value);
//     console.log("Chosen: " + result.chosen);
// }
