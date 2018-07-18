#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# this is a function that just returns the 'values' list so it can be sorted below
def getValue(item) :
    return item.value

def knapsack_solver(items, capacity):
  # sorting the item's values from largest to smallest with the reverse being true..
  # this is so we can just grab the first couple of items with the highest values until our knapsack is full
  items = sorted(items, key=getValue, reverse=True)
  # just wanted to look at the items after the value got sorted
  print(items)
  # creating an empty list called 'choices' to put our highest valued items into
  choices = []
  # creating a variable to keep track of our total values as we add them
  totalValue = 0

  # looping over all the items 
  for i in items:

    if i.size <= capacity:
      capacity -= i.size
      choices.append(i.index)
      totalValue += i.value
  return [totalValue, choices]




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