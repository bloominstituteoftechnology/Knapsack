#!/usr/bin/python

import sys
from collections import namedtuple


Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity, index=0, value=0, chosen=[]):
    # !!!! IMPLEMENT ME
   
    if index >= len(items):
        return[value, chosen]
   
    if items[index].size > capacity:
        return knapsack_solver(items, capacity, index + 1, value, chosen)
    
    else:
        chosencopy = chosen.copy()
        chosencopy.append(items[index].index)
 
        Nvalue = knapsack_solver(items, capacity, index+1, value, chosen)
        Yvalue = knapsack_solver(items, capacity - items[index].size, index+1, value + items[index].value, chosencopy)
        print(Nvalue)
        # print(Yvalue)
        if Nvalue[0] > Yvalue[0]:
            return Nvalue
        else:
           return Yvalue

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