# Organization for Knapsack Project

- youtube: [LS CS4 - Algorithms/Big O Intro](https://youtu.be/Hq3JA4ARqbg)
- github: [Knapsack Project](https://github.com/kiadorii/Knapsack)
- Knapsack: [More Information](https://en.wikipedia.org/wiki/Knapsack_problem)



## Data/Table Explanation
**Vegetables - (./data)**
|**Serial No.**|**Weight**    |**Price**     |
|:------------:|:------------:|:------------:|
|1             |42            |81            |
|2             |42            |42            |
|3             |68            |56            |
|4             |68            |25            |
|5             |77            |14            |
|6             |57            |63            |
|7             |17            |75            |
|8             |19            |41            |
|9             |94            |19            |
|10            |34            |12            |

1. User will enter the total weight of the backpack that it can afford `--threshold=100`, which in this case is 100.
2. Find all the vegetables that weigh <= 100.
3. Print the serial numbers of all the vegetables whose total weight calculates to <= 100 along with the total price.
```
Items to select: 2, 8, 10
Total cost: 95
Total value: 117
```

- Command line execution: `./knapsack input.txt --threshold=100`

#### Brainstorm
- Convert data from string to numbers
- Get program to read data (.txt) provided and command line inputs. `node fs - readline`

