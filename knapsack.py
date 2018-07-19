#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  current_set = None
  current_value = 0

  for firstSetItem in items:
    tuple = []
    size = 0
    value = 0
    tuple.append(firstSetItem)
    size += firstSetItem.size
    value += firstSetItem.value

    for secondSetItem in items:
      if firstSetItem != secondSetItem and secondSetItem.size + size <= capacity:
          tuple.append(secondSetItem)
          size += secondSetItem.size
          value += secondSetItem.value

    if value > current_value:
      current_set = tuple
      current_value = value

  return 'Items to select: {} \n Total cost: {} \n Total value: {}'.format(sorted([item.index for item in current_set]),
    sum([item.size for item in current_set]), current_value)

def better_knapsack_solver(items, capacity):
    storage = {}
    knapsack = {}
    for weight in range(0, capacity+1):
        storage[0, weight] = 0
        knapsack[0, weight] = []

    for index in range(1, len(items)+1):
        for weight in range(0, capacity+1):
            if items[index-1].size > weight:
                storage[index, weight] = storage[index-1, weight]
                knapsack[index, weight] = knapsack[index-1, weight]
            else:
                contains_new = storage[index-1, weight-items[index-1].size] + items[index-1].value
                contains_no_new = storage[index-1, weight]
                
                if contains_new > contains_no_new:
                    storage[index, weight] = contains_new
                    knapsack[index, weight] = knapsack[index-1, weight-items[index-1].size] + [index]
    #not done yet..

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