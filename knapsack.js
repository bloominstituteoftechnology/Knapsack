const fs = require("fs");
const path = require("path");
const rl = require("readline");

const args = process.argv.slice(2);

if (args.length != 2) {
	console.error("usage: knapsack filename maxsize");
	process.exit(2);
}

let [filename, maxsize] = args;
const filePath = path.resolve(__dirname, filename);

fs.readFile(filename, (err, data) => {
	let startTime = Date.now();
	if (err) {
		console.error("Couldn't find file");
		process.exit(1);
	}

	const inventory = data
		.toString()
		.split("\r\n")
		.reduce((items, item, index) => {
			if (item) {
				const [id, cost, value] = item.split(" ");
				items[index] = { id, cost, value };
			}
			return items;
		}, []);
	inventory.sort((a, b) => {
		return parseFloat(b.value / b.cost) - parseFloat(a.value / a.cost);
	});

	let knapsack = [];
	let space = 0;
	for (let i = 0; i < inventory.length; i++) {
		if (space < maxsize) {
			if (Number(inventory[i].cost) + space < maxsize) {
				knapsack.push(inventory[i]);
				space += Number(inventory[i].cost);
			}
		}
	}

	knapsack.sort((a, b) => {
		return a.id - b.id;
	});
	let endTime = Date.now();
	let totalTime = endTime - startTime;
	console.log("Knapsack contains: \n", knapsack);
	console.log("Capacity is: ", space, "out of", maxsize);
	console.log("Start time was", startTime, "end time was", endTime);
	console.log("Time taken was", totalTime);
});

if (isNaN(maxsize)) {
	console.error(`Knapsack size must be a number!`);
	process.exit(2);
}
