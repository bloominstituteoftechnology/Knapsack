#!/usr/bin/env node

const fs = require("fs");

const args = process.argv.slice(2);

if (args.length != 1) {
    console.error("usage: extractlinks inputfile");
    process.exit(1);
}

const filename = args[0];

const stuff = fs.readFileSync(filename, 'utf8');
const newStuff = stuff.split('\n');
for( let i = 0; i < newStuff.length; i++){
   newStuff[i] = newStuff[i].split(' ');
}
for( let i = 0; i < newStuff.length; i++){
    let here = newStuff[i];
   for (let j = 0; j < here.length; j++){
       here[j] = parseInt(here[j]);
   }
 }
newStuff.splice(newStuff.length -1, 1);

const threshold = 100;
const howMany = Math.round(Math.log(newStuff.length)) + (newStuff.length/10) +1;
const copy = newStuff.map(x => x);
let density = .5;

while(copy.length > howMany){
    for(let i = 0; i < copy.length; i++){
        let here = copy[i];
        if(!here[3]){
            let weight = here[1];
            let value = here[2];
            let calc = value/weight;
            let proportion = parseFloat(calc.toFixed(2));
            console.log(proportion);
            if (proportion >= density && weight <= threshold){
                here.push(proportion);
            }
            else{copy.splice(i,1);
                    i--;}
        }
        else {
            if (here[3] < density){
                copy.splice(i,1);
            }
        }
    }
    density = density +.1;
}
densitySort(copy);
let weightTotal = 0;
let valueTotal = 0;
let objects = []
addItUp(copy);
function addItUp(arr){
    console.log(arr);
    for(let i = 0; i < arr.length; i++){
        let here = arr[i];
        if(weightTotal + here[1] <= threshold){
            weightTotal = weightTotal + here[1];
            valueTotal = valueTotal + here[2];
            objects.push(here[0]);
        }
        else {
            console.log(`Weight Total: ${weightTotal}\n Value Total: ${valueTotal} \n Object Numbers : ${objects}`)
            return;
        }
    }
    console.log(`Weight Total: ${weightTotal}\n Value Total: ${valueTotal} \n Object Numbers : ${objects}`)
    return;
}

function densitySort(arr){
        while(true){
         let flag = false;
        for( let i = 0; i < arr.length-1; i++){
          let here = arr[i];
          let there = arr[i+1];
            if( there[3] > here[3] ){
                arr[i] = there;
                arr[i+1] = here;
                flag = true;
            }
            if (here[3] < there[3]){
                arr[i] = there;
                arr[i+1] = here;
                flag = true;
            }
        }
        if (flag === false){ break;}
       }
        return arr;
    }
