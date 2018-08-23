#!/usr/bin/python
#okay

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  pass

if __name__ == '__main__':
  if len(sys.argv) > 1:
    capacity = int(sys.argv[2]) # how much can fit in the knapsack
    file_location = sys.argv[1].strip() # file with items/weights/values
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split() # rstrip() strips off parameter (default newlines)
      items.append(Item(int(data[0]), int(data[1]), int(data[2])))
    
    file_contents.close()
    print(knapsack_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')

