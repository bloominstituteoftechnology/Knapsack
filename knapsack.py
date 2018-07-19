#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  solutions = []
  for head_item in items:
    bag = []
    head_item_index = items.index(head_item)
    for item in items[head_item_index + 1:]:
      bag_len = len(bag)
      if bag_len == 0:
        bag.append(head_item)
      if bag_len == 3:
        solutions.append(bag)
        bag = []
      if bag_len == 1:
        if item[1] + bag[0][1] <= capacity:
          bag.append(item)
        else:
          continue
      else:
        solutions.append(bag)
        bag = []
        continue
  print(solutions)

    


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