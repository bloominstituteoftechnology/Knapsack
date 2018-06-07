const fs = require('fs');
const args = process.argv.slice(2);

if(args.length != 2) {
    console.error("usage: ./knapsack fileData threshold");
    process.exit(2);
}

let [filename, threshold] = args;

if (isNaN(threshold)) {
    console.error(`threshold must be a number!`);
    process.exit(2);
}

const getData = () => fs.readFileSync(filename, 'utf-8');

const file = getData();
let lines = file.trim().split('\n');

let start = Date.now();
const preProcess = [];  const goodResults = []; const subProcess = [];
const n = lines.length;

// O(n)
for(let i = 0; i < n; i++) {
    const line = lines[i].split(' '); // O(1)
    preProcess.push(line); // O(1)
    subProcess.push(line); // O(1)
}

let end = Date.now();

console.log('First for 1: ', ((end - start) / 1000).toFixed(4));

// for(let i = 0; i < n; i++) {
//
//     let sizeResult = 0;
//     let res = [];
//     subProcess.forEach(function(el, j) {
//         if(preProcess[i] !== el){
//             if(sizeResult < threshold && parseInt(preProcess[i][1]) < threshold){
//                 sizeResult = parseInt(preProcess[i][1]) + parseInt(subProcess[j][1]) + sizeResult;
//                 if(sizeResult <= threshold){
//                     if(res.length === 0){
//                         res.push(preProcess[i]);
//                     }
//                     res.push(el);
//                 }
//             }
//             if(preProcess[i][1] === threshold && res.length === 0){
//                 res.push(preProcess[i]);
//             }
//             if(res.length > 0){
//                 // console.log('res', res);
//             }
//         }
//     });
//
//     goodResults.push(res);
// }

start = Date.now();

// This is O(n^2) should be lighter
preProcess.map((x, i) => {
    let sizeResult = 0;
    let res = [];

    console.log('MAIN RECORD: ', x);
    subProcess.forEach(function(el, j) {
        if(x !== el){
            if(sizeResult < threshold && parseInt(preProcess[i][1]) < threshold){

                console.log('   Less than threshold', el)
                sizeResult = parseInt(preProcess[i][1]) + parseInt(subProcess[j][1]) + sizeResult;
                if(sizeResult <= threshold){
                    if(res.length === 0){
                        res.push(x);
                    }
                    res.push(el);
                }
            }
            if(preProcess[i][1] === threshold && res.length === 0){
                res.push(preProcess[i]);
            }
            if(res.length > 0){
                // console.log('res', res);
            }
        }
    });

    goodResults.push(res);
});

end = Date.now();

console.log('Process & PreProcess O(n^2): ', ((end - start) / 1000).toFixed(4));

// Sum the values of each good combination.
goodResults.forEach(function(el, i) {
    let rsp = 0;
    el.forEach(item => { rsp = parseInt(item[2]) + rsp });
    goodResults[i].push(rsp);
});

// Sorting the good combinations values results ASC
const sortFunction = function(a, b) {
    if (a[a.length-1] === b[b.length-1])
        return 0;
    else
        return (a[a.length-1] < b[b.length-1]) ? -1 : 1;
};

goodResults.sort(sortFunction);

// Pop the last record which should be the highest
const itemToSelect =  goodResults.pop();

console.log('Items to select:');
console.log(itemToSelect);
console.log('');
console.log('Total value:', itemToSelect[itemToSelect.length-1]);

end = Date.now();

console.log('EXCUTION TIME: ', ((end - start) / 1000).toFixed(4));
