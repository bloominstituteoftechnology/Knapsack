#!/usr/bin/python

import sys
from collections import namedtuple
from itertools import chain, combinations

Item = namedtuple('Item', ['index', 'size', 'value'])

# Bruteforce Solution
def knapsack_solver_bruteforce(items, capacity):
  
  def powerset(iterable):
    "powerset([1,2,3]) --> (1,) (2,) (3,) (1,2) (1,3) (2,3) (1,2,3)"
    s = list(iterable)
    return chain.from_iterable(combinations(s, r) for r in range(1, len(s)+1))

  powerset_of_items = list(powerset(items))
  max_value = 0
  cost_of_max = 0
  items_of_max = []

  for sets in powerset_of_items:
    running_value = 0
    cost_of_running = 0
    items_of_running = []
    overload = False
    
    for item in sets:
      if cost_of_running + item[1] > capacity:
        overload = True
        break
      else:
        running_value += item[2]
        cost_of_running += item[1]
        items_of_running.append(item[0])

    if overload:
      continue

    if running_value > max_value:
      max_value = running_value
      cost_of_max = cost_of_running
      items_of_max = items_of_running

  return (f'Value: {max_value}\nSize: {cost_of_max}\nChosen: {str(items_of_max)[1:-1]}')

# Bottom-Up Solution
def knapsack_solver_bottomup(items, capacity):
  costs = []
  values = []
  for item in items:
    costs.append(item[1])
    values.append(item[2])
  n = len(items)

  def knapSack(capacity, costs, values, n):
    K = [[0 for x in range(capacity+1)] for x in range(n+1)]
 
    # Build table K[][] in bottom up manner
    for i in range(n+1):
        for w in range(capacity+1):
            if i==0 or w==0:
                K[i][w] = 0
            elif costs[i-1] <= w:
                K[i][w] = max(values[i-1] + K[i-1][w-costs[i-1]],  K[i-1][w])
            else:
                K[i][w] = K[i-1][w]
 
    return K[n][capacity]

  return knapSack(capacity, costs, values, n)


if __name__ == '__main__':
  if len(sys.argv) > 1:
    capacity = int(sys.argv[2])
    file_location = sys.argv[1].strip()
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split()
      items.append(Item(int(data[0]), int(data[1]), int(data[2])))
    
    file_contents.close()
    print(knapsack_solver_bottomup(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')