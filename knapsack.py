#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity, index = 0):
    # V = value T = taken
    def knapsack_help(items,capacity,V,T):
        if not items:
            return (V,T) 
        elif len(items) == 1:
            if items[0].size <= capacity:
                T[items[0].index - 1] = 1
                V += items[0].value
                return (V,T)
            else:
                return (V,T)
        
        elif items[0].size <= capacity:
            T_new = T[:]
            T_new[items[0].index - 1] = 1
            return_1 = knapsack_help(items[1:],
                                     capacity - items[0].size,
                                     T_new)
            return_2 = knapsack_help(items[1:],
                                     capacity,
                                     V,
                                     T)
            return max(return_1, return_2, key = lambda x: x[0])
        else:
            return knapsack_help(items[1:], capacity, V, T)
        
    return knapsack_help(items, capacity, 0, [0] * len(items))
            
            
            

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