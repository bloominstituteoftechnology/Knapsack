let fullString = `1 42 81
2 42 42
3 68 56
4 68 25
5 77 14
6 57 63
7 17 75
8 19 41
9 94 19
10 34 12
11 87 25
12 27 37
13 99 10
14 30 86
15 59 6
16 100 46
17 30 7
18 38 18
19 86 79
20 69 8
21 53 51
22 59 53
23 40 38
24 96 100
25 57 82
26 70 70
27 84 24
28 47 57
29 86 15
30 28 97
31 61 19
32 56 77
33 24 85
34 75 35
35 39 6
36 53 15
37 85 98
38 83 14
39 58 2
40 47 80
41 68 53
42 29 63
43 49 48
44 3 59
45 78 25
46 11 56
47 36 71
48 84 15
49 12 81
50 37 2
51 39 68
52 14 34
53 83 47
54 53 82
55 32 46
56 62 21
57 94 79
58 16 80
59 80 6
60 7 68
61 76 10
62 50 84
63 33 77
64 61 24
65 82 33
66 53 18
67 25 58
68 81 100
69 40 14
70 65 55
71 25 75
72 67 79
73 17 4
74 85 1
75 46 13
76 50 42
77 6 48
78 69 45
79 92 18
80 11 84
81 91 39
82 50 3
83 1 36
84 18 91
85 89 79
86 44 15
87 34 81
88 55 6
89 44 96
90 54 65
91 2 2
92 97 90
93 57 42
94 8 57
95 36 98
96 58 71
97 69 59
98 68 54
99 72 50
100 92 90
101 52 79
102 69 50
103 58 80
104 1 90
105 91 63
106 55 20
107 2 97
108 64 88
109 50 4
110 100 35
111 97 16
112 50 9
113 37 23
114 23 27
115 54 3
116 25 28
117 11 69
118 33 43
119 98 63
120 15 6
121 85 45
122 98 10
123 82 57
124 79 12
125 95 99
126 52 88
127 8 33
128 82 25
129 67 28
130 16 17
131 66 63
132 59 75
133 20 56
134 2 86
135 33 82
136 39 60
137 100 83
138 9 4
139 87 75
140 89 46
141 86 61
142 88 2
143 45 41
144 75 93
145 56 47
146 82 72
147 25 76
148 59 57
149 52 10
150 22 8
151 88 31
152 54 46
153 43 51
154 99 18
155 84 19
156 64 2
157 9 80
158 53 89
159 31 59
160 5 87
161 86 3
162 25 32
163 26 8
164 73 35
165 28 31
166 25 76
167 71 84
168 8 17
169 82 3
170 13 67
171 78 52
172 62 91
173 34 42
174 46 47
175 31 96
176 72 36
177 99 100
178 26 91
179 98 16
180 88 61
181 47 93
182 21 98
183 41 34
184 41 6
185 13 6
186 53 47
187 69 40
188 96 99
189 63 81
190 43 7
191 56 16
192 19 64
193 57 42
194 56 78
195 32 83
196 33 83
197 44 25
198 36 39
199 34 64
200 44 47`;
const fs = require('fs');
const filedata = fs.readFileSync('./medium2.txt', 'utf8');
//take lines from file input data and split them by line
const lines = filedata.trim().split(/[\r\n]+/g);
// let lines = fullString.split('\n');
console.log(lines[1]);
//Make a custom array of lines ending in the ratio of PAYOFF/COST
let mutatedLines = lines.map((line, index) => {
  //Split each line by space into an array of each number: '2 51 76' -> [2, 51, 76]
  let lineArr = line.split(' ');
  console.log(index);
  if (index < 3) console.log(lineArr);
  //Add the ratio of the payoff/cost to the end of the array: ['1', '18', '100'] -> ['1', '18', '100', '5.555']
  lineArr.push(Number(lineArr[2]) / Number(lineArr[1]));
  if (index < 3) console.log(lineArr);
  return lineArr;
});
console.log(mutatedLines[0].slice(3)[0]);
console.log(mutatedLines[0]);
// Create an array of objects from the custom array above
// Containing the index and the ratio of each LINE in order to sort
let doubleMutate = mutatedLines.map((line, index) => {
  if (index < 3) console.log(line);

  //
  return { index: index, ratio: line[3] };
});
console.log(doubleMutate[0], doubleMutate[1], doubleMutate[2]);
// Sort the array of objects containing the ratio and index by RATIO DESCENDING
doubleMutate.sort(function compareNumbers(a, b) {
  return b.ratio - a.ratio;
});
console.log(
  doubleMutate[0].index,
  doubleMutate[1].index,
  doubleMutate[2].index,
  doubleMutate[3].index,
  doubleMutate[4].index
);
// Running sum of cost that must be less than totalCost
let costSum = 0;
// Running sum of the total payoff
let totalPayoff = 0;
// tracking variable to make sure
let i = 0;
// while we haven't reached the end of the file
while (i <= lines.length - 1) {
  // Add to the running sum the cost of the line with the highest ratio
  // Starting at 0 because we sorted above to have highest ratio first
  costSum += Number(mutatedLines[doubleMutate[i].index][1]);
  // Add onto the running sum of the total payoff
  totalPayoff += Number(mutatedLines[doubleMutate[i].index][2]);
  // If we have gone over the total cost(costSum)...
  if (costSum > 100) {
    // Then we undo the additions above and continue looping
    costSum -= Number(mutatedLines[doubleMutate[i].index][1]);
    totalPayoff -= Number(mutatedLines[doubleMutate[i].index][2]);
  }
  i++;
}
console.log(totalPayoff);
console.log(mutatedLines[doubleMutate[0].index]);
console.log(doubleMutate[0].index);
