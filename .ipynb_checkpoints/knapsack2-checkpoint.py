#!/usr/bin/python
#brute force
import sys
from collections import namedtuple
import random

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
    maxval = []
    for i in range(1,10):
        val = 0
        size = 0
        nums = list(range(0,len(items)))
        nums.remove(i)
        for j in nums:
            nums2 = list(range(0,len(items)))
            nums2.remove(i)
            nums2.remove(j)
            for k in nums2:
                val = items[i].value + items[j].value + items[k].value
                size = items[i].size + items[j].size + items[k].size
                if size < capacity:
                    print(i,j,k)
                    maxval.append(val)
                    
    return max(maxval)

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