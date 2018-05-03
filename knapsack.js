const fs = require('fs');
const args = process.argv.slice(2);
const values = [];
const sizes  = [];
const table  = [];

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

const start = Date.now();
const preProcess = [];
const subProcess = [];
const goodResults = [];

for(let i = 0; i < lines.length; i++) {
    const line = lines[i].split(' ');
    preProcess.push(line);
    subProcess.push(line);
}

preProcess.map((x, i) => {

    let sizeResult = 0;
    let res = [];
    console.log('Main:',preProcess[i]);

    subProcess.forEach(function(el, j) {

        if(x !== el){
            // console.log('   SubProcess:', subProcess[j]);

            if(sizeResult < threshold && parseInt(preProcess[i][1]) < threshold){

                sizeResult = parseInt(preProcess[i][1]) + parseInt(subProcess[j][1]) + sizeResult;

                // console.log('   sizeResult',  sizeResult);

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
                console.log('res', res);
            }
        }
    });

    goodResults.push(res)


});

goodResults.forEach(function(el, i) {

    console.log('goodResult element', el);console.log('');

    let rsp = 0;

    el.forEach(item => { rsp = parseInt(item[2]) + rsp });

    goodResults[i].push(rsp);

    console.log('rsp::', goodResults);


});

const end = Date.now();

console.log('EXCUTION TIME: ', ((end - start) / 1000).toFixed(4));

