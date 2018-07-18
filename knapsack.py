#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# Bruteforce Solution
def knapsack_solver(items, capacity):
  max_value = 0
  items_of_max = []
  cost_of_max = 0

  for first_item in items:
    running_value = first_item[2]
    items_of_running = [first_item]
    cost_of_running = first_item[1]
    for second_item in items:
      if first_item == second_item:
        pass
      else:
        
  

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