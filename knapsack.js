const fs = require('fs');

const args = process.argv.slice(2);

if (args.length < 2) {
    console.error("require input file & threshold");
    process.exit(1);
}

const filename = args[0];
const threshold = args[1];

let content;

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.log(`error: ${err}`);
        exit(1);
    }

    content = formatData(data);

    console.log(knapsackGreedy(content, threshold));
    
});

function knapsackGreedy(items, capacity) {
    let value = 0;
    let weight = 0;
    let taken = [];
    
    let normItems = [];
    
    for (let i = 0; i < items.length; i++){
      normItems[i] = [items[i][0], items[i][1]/items[i][2], items[i][2]];
    }
    
    let sorted = normItems.sort((a, b) => {
  
      return a[1] - b[1];
    });
    
    for (let i = 0; i < sorted.length; i++) {
      if (weight + (sorted[i][1] * sorted[i][2]) <= capacity) {
        taken.push(sorted[i][0]);
        value += sorted[i][2];
        weight+= (sorted[i][1] * sorted[i][2]);
      }
      i++;
    }
    
    console.log(`value: ${value}\nweight: ${weight}\ntaken: ${taken}`);
  }

const formatData = (data) => {
    content = data.toString().trim().split("\n");

    for (let i = 0; i < content.length; i ++) {
        content[i] = content[i].toString().split(" ");
    }

    for (let i = 0; i < content.length; i++) {
        for(var j = 0; j < content[i].length; j++) {
            content[i][j] = parseInt(content[i][j], 10);
        } 
    }

    return content;
}