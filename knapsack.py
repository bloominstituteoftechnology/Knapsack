#!/usr/bin/python

import sys
from collections import namedtuple
from operator import attrgetter
from statistics import median

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
    knapsack = []
    secondknapsack = []
    cost = 0
    secondcost = 0
    average_value = median(items[2])
    for item in sorted(items, key=attrgetter("value"), reverse=True):
        if item.size <= capacity:
            if cost + item.size <= capacity:
                knapsack.append(item)
                cost += item.size
    for item in sorted(items, key=attrgetter("size")):
        if item.size <= capacity and item.value >= average_value:
            if secondcost + item.size <= capacity:
                secondknapsack.append(item)
                secondcost += item.size

    knapbag = sum(item.value for item in knapsack)
    secondknapswag = sum(item.value for item in secondknapsack)
    if knapbag > secondknapswag:
        return [knapbag, knapsack]
    else:
        return [secondknapswag, secondknapsack]

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