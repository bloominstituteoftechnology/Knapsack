#!/usr/bin/python
#brute force
import sys
from collections import namedtuple
import random

Item = namedtuple('Item', ['index', 'size', 'value'])


def knapsack_solver(items, capacity):
    ratiolist = []
    index = []
    value = []
    size = []
    iamtuple = []
    for i in range(0, len(items)):
        col = [items[i].index, items[i].size, items[i].value, items[i].value/items[i].size]
        iamtuple.append(((items[i].index),(items[i].size), (items[i].value), (items[i].value/items[i].size)))
        print(col)
        #print(iamtuple)
    #how to access without naming them
    print(iamtuple)
    
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