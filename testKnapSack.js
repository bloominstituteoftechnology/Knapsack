const fs = require('fs');

const args = process.argv.slice(-2);
if (!isFinite(args[1])) {
	console.error("usage: testKnapSack input.txt 100");
	process.exit(1);
}
const filename = args[0];
const data = fs.readFileSync(filename, 'utf8').split('\n')
const grid = data.map((line) => {
	return line.split(' ').map(s => +s);
	});
// console.log({filename, data, threshHold, grid, 'example number': grid[1][1]});
// const items = {};
// const max = {}; 
// let currentMax = 0;
// let remainingSpace = threshHold;
// 
// for (let size = 1; size <= threshHold; size++) {
// 	for (let item = 0; item < data.length - 1; item++) {
//	items[item] = [grid[item][1], grid[item][2]];
//		let currentSize = items[item][0];
//		let currentValue = items[item][1];
//		if (!max[size - 1]) max[size - 1] = 0;
//		if (!max[size]) max[size] = max[size - 1];
//		remainingSpace < 0 ? remainingSpace = 0 : remainingSpace = threshHold - currentSize;
//		if (size === currentSize) {
//			if (max[size] < currentValue) max[size] = currentValue;
//			if (max[size] <= currentValue + max[remainingSpace]) {
//				currentMax = currentValue + max[remainingSpace];
//				max[size] = currentMax;
//		} else {
//			currentMax = max[size];
//		}
//	}
//	}
//}
let m = []; // maximum value grid
const v = []; // Values 
const s = []; // Sizes
const n = grid.length - 1; // Number of distinct items.
const W = args[1]; // Knapsack capacity;


for (let x = 0; x < n; x++) {
	v.push(grid[x][2]);
	s.push(grid[x][1]);
}

for (let j = 0; j < W; j++) {
	m.push(Array(n).fill(0))
}

for (let i = 1; i <= n; i++) {
	for (let k = 0; k < W; k++) {
		if (s[i] > k) {
			m[i][k] = m[i-1][k]
		} else if (m[i-1][k] > m[i-1][k-s[i]] + v[i]) {
			m[i][k] = m[i-1][k];
		} else {
			m[i][k] = m[i-1][k-s[i]] + v[i];
		}
	}
}

console.log({m});
