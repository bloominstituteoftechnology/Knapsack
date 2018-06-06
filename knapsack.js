const fs = require('fs');

const argv = process.argv.slice(2);

if (argv.length !== 2) {
    console.error("usage: filepath capacity")
    process.exit(1);
}
const filename = argv[0];
const capacity = parseInt(argv[1]);

const filedata = fs.readFileSync(filename, "utf8");

const lines = filedata.trim().split(/[\r\n]+/g);

const items = [];

for (let line of lines) {
    const [index, size, value] = line.split(" ").map(num => parseInt(num));

    items.push({
        index: index,
        size: size,
        value: value,
    });
}

let rated = [];
items.forEach(obj => {
    const rating = obj.value / obj.size;
    const index = obj.index;
    rated[index] = { index: obj.index, size: obj.size, value: obj.value, rating: rating };
})

console.log('rated', rated[27])
console.log('rated', rated[109])
console.log('rated', rated[25])

let full = false;
const knapsack = [];
let knapsacksize = 0;
while (!full) {
    let filtered = rated.filter(obj => obj.size <= (capacity - knapsacksize));
    if (filtered.length > 0) {
        let maxIndex = 0;
        let maxRating = 0;
        for (let i = 0; i < filtered.length; i++) {
            if (filtered[i].rating > maxRating) {
                maxIndex = filtered[i].index, maxRating = filtered[i].rating;
            }
        }
        knapsacksize += rated[maxIndex].size;
        knapsack.push(rated.splice(maxIndex, 1, {}));
    } else full = true;
}

// compare = (a, b) => {
//     if (a < b) return 1;
//     if (a > b) return -1;
//     return 0;
// }
// console.log('rated', rated)


// while (!full) {
//     let filtered = rated.filter(obj => obj.size < (capacity - knapsacksize));
//     if (filtered.length > 0) {
//         filtered.sort((a, b) => compare(a.rating, b.rating));
//         knapsacksize += filtered[0].size;
//         rated = rated.filter(item => item !== filtered[0]);
//         knapsack.push(filtered[0]);
//     } else full = true;
// }
let total = {
    Value: 0,
    Size: 0,
    Chosen: [],
};
knapsack.forEach(obj => {
    total.Value += obj[0].value;
    total.Size += obj[0].size;
    total.Chosen.push(obj[0].index);
})
console.log('total', total);

// console.log('knapsack',knapsack)


// console.log(items);