#!/usr/bin/python

import sys
from collections import namedtuple


Item = namedtuple('Item', ['index', 'size', 'value', 'ratio'])

def knapsack_solver(items, capacity):
    items_sorted_by_ratios = (sorted(items, key=lambda x: x.ratio))
    knapsack = []
    avail_weight = capacity
    for i in reversed(items_sorted_by_ratios):
        if i.size <= avail_weight:
          knapsack.append(i)
          avail_weight -= i.size
    return knapsack




if __name__ == '__main__':
  if len(sys.argv) > 1:
    capacity = int(sys.argv[2])
    file_location = sys.argv[1].strip()
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split()
      items.append(Item(int(data[0]), int(data[1]), int(data[2]), int(data[1]) / int(data[2])))
    
    file_contents.close()
    print(knapsack_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')