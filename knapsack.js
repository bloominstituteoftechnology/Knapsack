const fs = require('fs');

fs.readFile(`./data/${process.argv[2]}`, (err, data) => {
  if (err) {
    console.error('Could not find file')
    process.exit(1)
  }
  const dataArray = data
    .toString()
    .split('\n')
    .reduce((res, item, i) => {
      if (!item) {
        return res
      }
      const line = item.split(' ') // 1, 42, 81
      res[i] = { item: line[0], size: Number(line[1]), val: Number(line[2]) }
      return res;
    }, [])

  //console.log(dataArray);
  const max = process.argv[3];
  let count = 0;
  let array = [];
  let weight = 0;
  let value = 0;
  let cost = 0;
  let final = [[], [], []];
  while (weight < max && count < 1000) {
    count++;
    for (h = 0; h < dataArray.length; h++) {
      for (i = h + 1; i < dataArray.length; i++) {
        for (j = i + 1; j < dataArray.length; j++) {
          if ((dataArray[h].size + dataArray[i].size + dataArray[j].size) < 101) {
            let currW = (dataArray[h].size + dataArray[i].size + dataArray[j].size);
            let currV = (dataArray[h].val + dataArray[i].val + dataArray[j].val);
            if (currW < 101 && currV > value) {
              weight = (dataArray[h].size + dataArray[i].size + dataArray[j].size);
              value = (dataArray[h].val + dataArray[i].val + dataArray[j].val);
              final[0] = [dataArray[h].item, dataArray[i].item, dataArray[j].item];
              final[1] = weight;
              final[2] = value;
            }
            for (k = j + 1; k < dataArray.length; k++) {
              if ((dataArray[h].size + dataArray[i].size + dataArray[j].size + dataArray[k].size) < 101) {
                let currentW = (dataArray[h].size + dataArray[i].size + dataArray[j].size + dataArray[k].size);
                let currentV = (dataArray[h].val + dataArray[i].val + dataArray[j].val + dataArray[k].val);
                if (currentV > value && currentW < 101)
                  weight = (dataArray[h].size + dataArray[i].size + dataArray[j].size + dataArray[k].size);
                value = (dataArray[h].val + dataArray[i].val + dataArray[j].val + dataArray[k].val);
                final[0] = [dataArray[h].item, dataArray[i].item, dataArray[j].item, dataArray[k].item];
                final[1] = weight;
                final[2] = value;
              }
            }
          }
        }
      }
    }
  }
  console.log("Items to select: ", final[0].toString());
  console.log("Total cost: ", final[1]);
  console.log("Total value: ", final[2]);
  return;
});