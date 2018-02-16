const fs = require('fs');

fs.readFile('data/small2.txt', (err, data) => {
	if (err) {
		console.error('Could not find file');
		process.exit(1);
	}
	const dataArray = data
		.toString()
		.split('\n')
		.reduce((res, item, i) => {
			if (!item) {
				return res;
			}
			const line = item.split(' '); // 1, 42, 81
			res[i] = { item: line[0], size: Number(line[1]), val: Number(line[2]) };
			return res;
    }, []);

    dataArray.sort((a, b) => a.size / a.val - b.size / b.val);
    let weight = 0, value = 0, items = [];
    for(let i = 0; i < dataArray.length; i++) {
      if (weight + dataArray[i].size <= 100) {
        value += dataArray[i].val;
        weight += dataArray[i].size;
        items.push(dataArray[i].item);
      }
    }
    console.log(dataArray);
    console.log("Maximum value is: ",value);
    console.log("With a weight of: ", weight);
    console.log("Select these items: ", items.sort((a, b) => a - b).toString());
  });