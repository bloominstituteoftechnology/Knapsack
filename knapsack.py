#!/usr/bin/python

import sys
from collections import namedtuple

# added a value of 'rank' this allows me to sort items by worth
Item = namedtuple('Item', ['index', 'size', 'value', 'rank'])

def knapsack_solver(items, capacity):
  # sorting by worth
  worth = sorted(items, key=lambda x: x.rank, reverse=True)
  # hold remaining capacity
  capacity_left = capacity
  #holds answers
  items_carried = []
  total_value = 0
  total_size = 0

  # this loop starts at the most valuable item and checks if it will fit
  # into the knapsack. it it will, the values are added
  for i in worth:
    if capacity_left - i.size >= 0:
      items_carried.append(i.index)
      capacity_left -= i.size
      total_value += i.value
      total_size += i.size

  return "Value: {} \nSize: {} \nChosen: {}".format(total_value, total_size, str(items_carried)[1:-1])

  



if __name__ == '__main__':
  if len(sys.argv) > 1:
    capacity = int(sys.argv[2])
    file_location = sys.argv[1].strip()
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split()
      items.append(Item(int(data[0]), int(data[1]), int(data[2]), (int(data[2]) / int(data[1])) ))
    
    file_contents.close()
    print(knapsack_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')