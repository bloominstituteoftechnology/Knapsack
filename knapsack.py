#!/usr/bin/python

import sys
import math
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  knapsack = []
  total_cost = 0
  total_value = 0
  while capacity > 0:
    biggest_gain = -math.inf
    cost = 0
    value = 0
    chosen_item = None
    for item in items:
      if item[1] <= capacity and item[2]/item[1] > biggest_gain:
        biggest_gain = item[2]/item[1]
        chosen_item = item
        value = item[2]
        cost = item[1]
    if chosen_item == None:
      capacity = 0
      break
    else:
      knapsack.append(chosen_item[0])
      total_cost += cost
      total_value += value
      items.remove(chosen_item)
      capacity -= cost
  return "\nitems to select: %s\ntotal cost: %s\ntotal value: %s" %(knapsack, total_cost, total_value)
    
    
      

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