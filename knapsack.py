#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  knapsack = []
  
  # if knapsack if full
  if capacity == 0:
    return 0
  # if we made room for items  
  if len(value) == index: 
    return 0
  # if item does not fit, ignore and move to next item
  if size[index] > capacity:
    return knapsack(value, size, index+1, capacity)
  # recursive step

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