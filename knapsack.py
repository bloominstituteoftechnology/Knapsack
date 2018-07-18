#!/usr/bin/python
# Wladimir Fraga CS10

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  totalCapacity = 0
  totalValue = 0
  combination = []
  solutions = []
  i = 0
  while i < len(items):
    if totalCapacity + items[i].size <= capacity:
      totalCapacity += items[i].size
      combination.append(items[i])
      i += 1
    else:
      totalCapacity = 0
      totalValue = 0
      solutions.append(combination)
      combination = []
  return solutions

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
    solutions = knapsack_solver(items, capacity)
    for solution in solutions:
      print(solution)

  else:
    print('Usage: knapsack.py [filename] [capacity]')