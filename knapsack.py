#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# Bruteforce Solution
def knapsack_solver(items, capacity):
  max_value = 0
  items_of_max = []
  cost_of_max = 0

  for starting_item in items:
    # Don't run if the first item is over capacity
    if starting_item[1] <= capacity:
      running_value = starting_item[2]
      items_of_running = [starting_item[0]]
      cost_of_running = starting_item[1]
      
      for additional_item in items:
        # Don't duplicate items
        if starting_item == additional_item:
          pass
        
        # Don't go over capacity
        elif cost_of_running + additional_item[1] > capacity:
          pass

        else:
          running_value += additional_item[2]
          items_of_running.append(additional_item[0])
          cost_of_running += additional_item[1]

          if running_value > max_value:
            max_value = running_value
            items_of_max = items_of_running
            cost_of_max = cost_of_running

  return (f'Value: {max_value}\nSize: {cost_of_max}\nChosen: {str(items_of_max)[1:-1]}')
  

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