#!/usr/bin/python

import sys
from collections import namedtuple
import random

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):  
    maxval = []
    for i in range(0,1000000):
        size = 0
        value = 0
        its = []
        nums = list(range(0,len(items)))
        while size < capacity:
            n = random.choice(nums)
            nums.remove(n)
            size = size + items[n].size
            if size < capacity:
                value = value + items[n].value
                its.append(n)
                #print("val",value,"size",size)
                #print(its)
                maxval.append((value,its))
            
    print(max(maxval))
  # !!!! IMPLEMENT ME
    

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