const fs = require('fs');
const args = process.argv.slice(2);
//console.log(args);
if(args.length < 2 ) {
    console.log("enter file name follwed by thresold");
    process.exit(1);
}

const filename = args[0];
const thresold =args[1];

let data = fs.readFileSync(filename,"utf8");
const t1 = Date.now();
let arr = data.split('\n');
arr.pop();

const items = [];
arr.forEach(element => {
    i = element.split('');
    items.push({
        item: (i[0]), 
        size: Number(i[1]),
        value: Number(i[2]),
        ratio: Number(i[2]/i[1])
    });
});

//sort object by ratio
const sortedRatio = items.sort((a,b) => {
    b.ratio - a.ratio;
});
const bag = [];
let size = 0;
//push selected item into bag

sortedRatio.forEach(item => {
    let testSize = size + item.size;
    if(testSize <= thresold){
        bag.push(item);
        size += item.size;
    }
});
//calculate total
const selected = [];
let totalSize = 0;
let totalValue = 0;
bag.forEach(i => {
    selected.push(i.item);
    totalValue += i.value;
    totalSize += i.size;
});

const t2 = Date.now();
//print
  console.log(`Item collected: ${selected}`);
  console.log(`Total size: ${totalSize}`);
  console.log(`Total value: ${totalValue}`);
  console.log(`Total time it took: ${(t2-t1) / 1000} s`);
