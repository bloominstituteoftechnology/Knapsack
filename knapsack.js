const fs = require('fs');





function knapsackRecursive(items, thresold) {
    function recur(i, size) {
        
        //base case 
        if(i == 0 || size == 0) {
            return 0;
        } 
        else if(items[i] > size) {
            return recur(i-1, size);
        }
        else {
            return Math.max(
                recur(i-1, size),
                recur(i-1, size - items[i]) + items[i]
            );
        }
    }
    return recur(items.length -1, thresold);
}

const args = process.argv.slice(2);

const knapsack = {};

if(args.length != 2) {
    console.error("require correct arguments");
    process.exit(1);
}
const filename = args[0];
const thresold =args[1];

let itemInfo = fs.readFileSync(filename,"utf8");

let items = itemInfo.split('\n');
items.pop();
//console.log(items);


const value = knapsackRecursive(items, thresold);
console.log(value);