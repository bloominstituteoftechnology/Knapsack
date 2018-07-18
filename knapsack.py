#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# Start with brute force/recursive function that works with small data sets
def knapsack_solver(items, capacity):

  #Define recursive function

  def check_knapsack(i, size):
    if (items[i].size > size):
      # Goes through each item in knapsack and returns their sizes
      return check_knapsack(i - 1, size)

    elif (i == -1):
      # Returns empty if knapsack is empty
      return 'Knapsack is empty'

    else:
      item1 = check_knapsack(i - 1, size)
      item2 = check_knapsack(i - 1, size - items[i].size)

      # Increase the value of the knapsack total by the selected item
      item2.value += items[i].value

      if (item1.value > item2.value):
        return item1
      
      else:
        item2.size += items[i].size
        item2.chosen = item1.chosen + (i + 1)
        return item2

  return check_knapsack(len(items) - 1, capacity)

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