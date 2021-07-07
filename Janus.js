const fs = require("fs");
const args = process.argv.slice(2);

let t0 = Date.now();

// Sample CLI input: node ./data/large1.txt 100

fs.readFile(args[0], (err, data) => {
	if (err) return console.log({ error: err });
	else {
		Janus(data, args[1]);
		let t1 = Date.now();
		let elapsed = t1 - t0;
		console.log({ elapsed });
		console.log("seconds elapsed = " + Math.floor(elapsed / 1000));
	}
});

// 1st number = option // Aspect Name
// 2nd number = cost // Negative Aspect
// 3rd number = kudos // Positive Aspect

// Janus will analyze data to maximize the total positive aspect
// of positive aspects bound to a negative aspect(given a limit of potential negative aspect).

const Janus = (data, maxCost) => {
	data = data.toString();
	const regex = /(\d{1,})/g;
	data = data.match(regex);

	let ranking = [];
	for (let i = 2; i <= data.length - 1; i += 3) {
		ranking.push({
			option: data[i - 2],
			cost: parseInt(data[i - 1]),
			kudos: parseInt(data[i]),
			weight: parseInt(data[i]) / parseInt(data[i - 1])
		});
	}

	ranking = quickSort(ranking, "weight").reverse();

	let bestOptions = [];
	let currentCost = 0;
	let currentKudos = 0;
	let i = 0;
	while (currentCost <= maxCost && i <= ranking.length - 1) {
		currentCost += ranking[i].cost;
		currentKudos += ranking[i].kudos;
		bestOptions.push(ranking[i]);
		i++;
	}
	while (currentCost > maxCost) {
		currentCost -= bestOptions[bestOptions.length - 1].cost;
		currentKudos -= bestOptions[bestOptions.length - 1].kudos;
		bestOptions.splice(-1, 0);
	}

	console.log({
		totalCost: currentCost,
		totalKudos: currentKudos,
		optionCount: bestOptions.length,
		bestOptions,
		rankingRemains: ranking.slice(bestOptions.length, ranking.length)
	});
};

const quickSort = (arr, target) => {
	if (arr.length <= 1) {
		return arr;
	}
	let less = [],
		greater = [];

	let pivot = arr.splice(Math.floor(arr.length / 2), 1);
	for (let i = 0; i <= arr.length - 1; i++) {
		if (arr[i].weight <= pivot[0].weight) {
			less.push(arr[i]);
		} else {
			greater.push(arr[i]);
		}
	}
	let c = [];
	return c.concat(quickSort(less), pivot, quickSort(greater));
};
