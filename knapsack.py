#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  best_set = None
  best_value = 0

  for itemA in items:
    set = []
    size = 0
    value = 0

    set.append(itemA)
    size += itemA.size
    value += itemA.value

    if value > best_value:
      best_set = set
      best_value = value

    for itemB in items:
      if itemA != itemB:
        if itemB.size + size <= capacity:
          set.append(itemB)
          size += itemB.size
          value += itemB.value

    if value > best_value:
      best_set = set
      best_value = value
  
  return f'''\nItems to select: {sorted([item.index for item in best_set])}
Total cost: {sum([item.size for item in best_set])}
Total value: {best_value}'''

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