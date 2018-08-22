#!/usr/bin/python

import sys
from collections import namedtuple
import numpy as np

Item = namedtuple('Item', ['index', 'size', 'value'])

"""

the dynamic programming method of solving the 0:1 knapsack problem would be to create
memoization table/matrix with the possible max values at any given capacity. 

n items –> 2n-1 knapsacks to evaluate...so dp will make it easier to implement kp

i.e.
#CURR VAL/WEIGHT IS SORTED BY WEIGHT!
"sow"        | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8  | 9 | #SUMOFWEIGHTS ----> max weight
-------------|---|---|---|---|---|---|---|---|----|---|
curr val/wt  | 0 |   |   |   |   |   |   |   |    |   |
-------------|---|---|---|---|---|---|---|---|----|---|
val: 1; wt: 1| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1  | 1 | weight 1 can always contribute to forming sum of weights
-------------|---|---|---|---|---|---|---|---|----|---|
val: 4; wt: 2| 0 |ˆ1 | 4 | 5 | 5 | 5 | 5 | 5 | 5  | 5 |ˆn == brought it down from upper cell
-------------|---|---|---|---|---|---|---|---|----|---|
val: 4; wt: 3| 0 |ˆ1 |ˆ4 | 5 | 5 |•8 | 9 | 9 | 9  | 9 |
-------------|---|---|---|---|---|---|---|---|----|---|
val: 5; wt: 4| 0 |ˆ1 |ˆ4 |ˆ5 | 5 | 8 | 9 | 10| 10 |•13| •n == included in bag
-------------|---|---|---|---|---|---|---|---|----|---|
val: 7; wt: 5| 0 |ˆ1 |ˆ4 |ˆ5 |ˆ5 | 8 | 9 | 11| 12 |ˆ13| <--this is the max value, but was taken from above
-------------|---|---|---|---|---|---|---|---|----|---|
              ^0-th column is base case
capacity == 9
if item weight <= current "sow"
  value = max((value by including weight), (value by excluding weight))

  value by including weight:
    value of new weight + (result of going to above row cell)
      above row cell:
        sow column = sumofwtcolumn - currentweightrow
        sow row = currentweightrow - 1


else if item weight > sum of weights:
  copy the value from the above cell

how do we check to see if items are in bag?? 
from max value, check (sow-w)...if we go to the corresepnding cell in the row above...
does its weight and column number add up to the value? If so, it was included

"""
capacity = 100

def knapsack_solver(items, capacity):
  sorteditems = sorted(items, key=lambda item: item[1])
  length = len(sorteditems)
  print(sorteditems)
  table = np.pad(np.zeros((capacity, length)), (0,1),'constant')
  
  
  for row in range(1, length + 1): #row
    value = sorteditems[row-1][1]
    weight = sorteditems[row-1][2]

    print(value, weight)
    
  for j in range(1, length + 1):
      # j is the column in the table
    value = sorteditems[j-1][2]
    weight = sorteditems[j-1][1]
    
    for i in range(1, capacity + 1):
        # i is the row in the table
        if weight > i:
            table[i,j] = table[i,j-1]
        else:
            table[i,j] = max(table[i,j-1], table[i-weight, j-1] + value)
        

  print(table)

  taken = np.empty(length).astype(str)
  remainingroom = capacity

  for i in range(length, 0, -1):
    if table[remainingroom][i] != table[remainingroom][i-1]:
      taken[i-1] = 'Chosen'
      weight = sorteditems[i-1][1]
      remainingroom -= weight
    else:
      taken[i-1] = 'Not Chosen'
  print(np.array(sorteditems)[np.where(taken == 'Chosen')[0], :])
  print(taken)
if __name__ == '__main__':
  if len(sys.argv) > 1:
    file_location = sys.argv[1].strip()
    file_contents = open(file_location, 'r')
    items = []

    for line in file_contents.readlines():
      data = line.rstrip().split()
      items.append(Item(int(data[0]), int(data[1]), int(data[2])))
    
    file_contents.close()
    print(knapsack_solver(items, capacity))
  else:
    filename = "data/small1.txt"
    print("Usage: knapsack.py {} {}".format(filename, capacity))