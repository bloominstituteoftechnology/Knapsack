#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  # Brute Force
  #   add size of 'all' combinations less than the capacity
  #   find the largest value
  indice = []

  for items in Item:
    size_1 = Item[i][1]
    for items in Item:
      size_2 = Item[j][1]
      mid_sum = size_1 + size_2
    if mid_sum <= capacity and i != j:
      indice.append(i, j)

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