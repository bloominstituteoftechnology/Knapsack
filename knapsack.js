const fs = require('fs');
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error("Enter a filename follow by threshold");
  process.exit(1);
}

//extract filename and user capacity input
const filename = args[0];
const capacity = args[1]

fs.readFile(`./data/${filename}`, 'utf8', (err, data) => {
  const t1 = Date.now();
  const arr = data.split('\n');
  arr.pop();
  // create array of object with property item, size, value and ratio
  const items = [];
  arr.forEach(a => {
    i = a.split(' ');
    items.push({item: (i[0]), size: Number(i[1]), value: Number(i[2]), ratio: Number(i[2]/i[1])});
  });
  // sort object by ratio
  const sortedRatio = items.sort((a, b)=> b.ratio - a.ratio);
  const bag = [];
  let size = 0;
  // push selected item into bag
  sortedRatio.forEach(item => {
    let testSize = size + item.size;
    if(testSize <= capacity){
      bag.push(item);
      size += item.size;
    }
  });
  // calculate total
  const selected = [];
  let totalSize = 0;
  let totalValue = 0;
  bag.forEach(i => {
    selected.push(i.item);
    totalValue += i.value;
    totalSize += i.size;
  });

  const t2 = Date.now();
  // print
  console.log(`Item collected: ${selected}`);
  console.log(`Total size: ${totalSize}`);
  console.log(`Total value: ${totalValue}`);
  console.log(`Total time it took: ${(t2-t1) / 1000} s`);
});