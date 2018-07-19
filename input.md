1 42 81
2 42 42
3 68 56
4 68 25
5 77 14
6 57 63
7 17 75
8 19 41
9 94 19
10 34 12

---

The goal is to select a subset of the items to maximize the payoff such that the cost is below some threshold. 

1, value = 70, weight = 25
2, value = 50, weight = 10

Max weight your bag can carry = 25

Combination   Total Value Total Weight Valid?
1             70          25            Yes, 25 = 25
1 2           120         35            No, 35 > 25
2             50          10            Yes, 10 < 25
2 1           120         35            No, 35 > 25

---

Givens:
```py
items = [(item, weight, value)]
max_weight = 25

best_items = []
best_value = 0

for i in range(0,1):
  knapsack = []
  value_in_knapsack = 0
  weight_of_knapsack = 0

  if items[i].weight <= max_weight:
    knapsack.append(items[i])
    value_in_knapsack += items[i].value
    weight_of_knapsack += items[i].weight
  
  if best_value < value_in_knapsack:
    best_value = value_in_knapsack
    best_items = knapsack
  
  for j in range(0,1):
    if items[i] != items[j]:
      if items[i].weight + weight_of_knapsack <= max_weight:
        knapsack.append(items[i])
        value_in_knapsack += items[i].value
    
      if best_value < value_in_knapsack:
        best_value = value_in_knapsack
        best_items = knapsack
  
```


n*(n+1)/2 = 3*(4)/2 = 6

