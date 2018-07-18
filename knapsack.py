#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value', 'true_value'])

def knapsack_solver(items, capacity):
  true_value = 0
  array = []
  knapsack = capacity or 100
  for item in items:
    array.append(item.true_value)

  array.sort(key=int)
  # while knapsack > 0:
  #   pass

  return array

if __name__ == '__main__':
  if len(sys.argv) > 1:
    capacity = int(sys.argv[2])
    file_location = sys.argv[1].strip()
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split()
      items.append(Item(int(data[0]), int(data[1]), int(data[2]), int(data[2]) -int(data[1])))
    
    file_contents.close()
    print(knapsack_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')