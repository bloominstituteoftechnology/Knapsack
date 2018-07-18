#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value', 'ratio'])

def knapsack_solver_maybe(items, capacity):
  """!!!! IMPLEMENT ME"""
  # set = []
  # size = 0
  # value = 0
  best_set = None
  best_value = 0

  for itemA in items:
    set = []
    size = 0
    value = 0

    set.append(itemA)
    size += itemA.size
    value += itemA.value
    print('current set A:',[item.index for item in set])

    if value > best_value:
      best_set = set
      best_value = value

    for itemB in items:
      if itemA != itemB:
        if itemB.size + size <= capacity:
          set.append(itemB)
          size += itemB.size
          value += itemB.value
          print('current set B:',[item.index for item in set])
      # print('current set:',set)

    if value > best_value:
      best_set = set
      best_value = value
      # print('bests:',best_value,best_set)
  
  return f'''\nItems to select: {sorted([item.index for item in best_set])}
Total cost: {sum([item.size for item in best_set])}
Total value: {best_value}'''

def knapsack_solver(items, capacity):
  sorted_items = sorted(items, key=lambda item: item.ratio, reverse=True)
  best_set = []
  current_size = 0

  for item in sorted_items:
    if item.size + current_size <= capacity:
      best_set.append(item)
      current_size += item.size
      print('best set so far:',best_set)
  
  return f'''\nItems to select: {sorted([item.index for item in best_set])}
Total cost: {sum([item.size for item in best_set])}
Total value: {sum([item.value for item in best_set])}'''

if __name__ == '__main__':
  if len(sys.argv) > 1:
    capacity = int(sys.argv[2])
    file_location = sys.argv[1].strip()
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split()
      items.append(Item(int(data[0]), int(data[1]), int(data[2]), int(data[2])/int(data[1])))
    
    file_contents.close()
    print(knapsack_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')