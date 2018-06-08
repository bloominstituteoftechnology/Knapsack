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

function memoizedKnapsack(items, capacity) {
    // console.log(items.length, capacity);
    // initalize cache (in this, it will be a matrix)
    const cache = Array(items.length);

    // add the second dimension
    for (let i = 0; i < items.length; i++) {
        cache[i] = Array(capacity + 1).fill(null);
    }

    function recurseMemo(i, capacityLeft) {
        if (i === -1) {
            return {
                value: 0,
                size: 0,
                chosen: [],
            };
        }

        let value = cache[i][capacityLeft];

        if (!value) {
            value = recurseNaive(i, capacityLeft);
            cache[i][capacityLeft] = Object.assign({}, value);    // make a copy
        }

        return value;
    }

    function recurseNaive(i, capacityLeft) {
        if (i === -1) {
            return {
                value: 0,
                size: 0,
                chosen: [],
            };
        }
        // check to see if the item fits
        else if (items[i].size > capacityLeft) {
            return recurseMemo(i - 1, capacityLeft);
        }
        // Item fits, but might not be worth as much as items in there already
        // But is it worth taking? Does it positively affect our value?
        else {
            // The value we get from not taking the item
            const r0 = recurseMemo(i - 1, capacityLeft);
            const r1 = recurseMemo(i - 1, capacityLeft - items[i].size)

            r1.value += items[i].value;

            if (r0.value > r1.value) {
                return r0;
            } else {
                r1.size += items[i].size;
                r1.chosen = r1.chosen.concat(items[i].index);
                return r1;
            }
        }
    }
    return recurseMemo(items.length - 1, capacity);
}

// Iterative Approach
function knapsackIterative(items, capacity) {
    const cache = Array(items.length);

    for (let i = 0; i < items.length; i++) {
        cache[i] = Array(capacity + 1).fill(null);
    }

    // seed the cache with some initial values
    for (let i = 0; i <= capacity; i++) {
        cache[0][i] = {
            size: 0,
            value: 0,
            chosen: []
        };
    }

    // Loop through all the items in our items array
    for (let i = 1; i < items.length; i++) {
        // Loop through all the capacities
        for (let j = 0; j <= capacity; j++) {
            if (items[i].size > j) {
                // if the item is too large, use the previous value
                cache[i][j] = cache[i - 1][j];
            } else {
                // Item fits 
                const r0 = cache[i - 1][j];
                const r1 = Object.assign({}, cache[i - 1][j - items[i].size]);

                r1.value += items[i].value;

                if (r0.value > r1.value) {
                    cache[i][j] = r0;
                } else {
                    r1.size += items[i].size;
                    r1.chosen = r1.chosen.concat(items[i].index);
                    cache[i][j] = r1;
                }
            }
        }
    }

    return cache[cache.length - 1][capacity];
}

// console.log(memoizedKnapsack(items, capacity));

// let rated = [];
// items.forEach(obj => {
//     const rating = obj.value / obj.size;
//     const index = obj.index;
//     rated[index] = { index: obj.index, size: obj.size, value: obj.value, rating: rating };
// })

// console.log('rated', rated[27])
// console.log('rated', rated[109])
// console.log('rated', rated[25])

// let full = false;
// const knapsack = [];
// let knapsacksize = 0;
// while (!full) {
//     let filtered = rated.filter(obj => obj.size <= (capacity - knapsacksize));
//     if (filtered.length > 0) {
//         let maxIndex = 0;
//         let maxRating = 0;
//         for (let i = 0; i < filtered.length; i++) {
//             if (filtered[i].rating > maxRating) {
//                 maxIndex = filtered[i].index, maxRating = filtered[i].rating;
//             }
//         }
//         knapsacksize += rated[maxIndex].size;
//         knapsack.push(rated.splice(maxIndex, 1, {}));
//     } else full = true;
// }

// // compare = (a, b) => {
// //     if (a < b) return 1;
// //     if (a > b) return -1;
// //     return 0;
// // }
// // console.log('rated', rated)


// // while (!full) {
// //     let filtered = rated.filter(obj => obj.size <= (capacity - knapsacksize));
// //     if (filtered.length > 0) {
// //         filtered.sort((a, b) => compare(a.rating, b.rating));
// //         knapsacksize += filtered[0].size;
// //         rated = rated.filter(item => item !== filtered[0]);
// //         knapsack.push(filtered[0]);
// //     } else full = true;
// // }
// let total = {
//     Value: 0,
//     Size: 0,
//     Chosen: [],
// };
// knapsack.forEach(obj => {
//     total.Value += obj[0].value;
//     total.Size += obj[0].size;
//     total.Chosen.push(obj[0].index);
// })
// console.log('total', total);

// // console.log('knapsack',knapsack)


// // console.log(items);