#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  
  amount = len(items)

  values = []
  for i in range(amount):
    values.append(items[i][2])

  costs = []
  for i in range(amount):
    costs.append(items[i][1])  

  def knappy(capacity, values, costs, amount):
    if amount == 0 or capacity == 0:
        return 0

    if (costs[amount-1] > capacity):
        return knappy(capacity, values, costs, amount-1)

    else:
        return max(values[amount-1] + knappy(capacity-costs[amount-1], costs, values, amount-1),
                    knappy(capacity, values, costs, amount-1))
  # return values, costs, amount
  return knappy(capacity, values, costs, amount)

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
    print(knapsack_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')