#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])


def knapSack(W , wt , val , n):
    sizes=[]
    choices=[]
 
    # Base Case
    if n == 0 or W == 0 :
        return 0
 
    # If weight of the nth item is more than Knapsack of capacity
    # W, then this item cannot be included in the optimal solution
    if (wt[n-1] > W):
        return knapSack(W , wt , val , n-1)
 
    # return the maximum of two cases:
    # (1) nth item included
    # (2) not included
#only returns value:
    else:
        return max(val[n-1] + knapSack(W-wt[n-1] , wt , val , n-1),
                   knapSack(W , wt , val , n-1))

    '''
    #trying to return not just value, but also size and chosen:
    else:
      if (val[n-1] + knapSack(W-wt[n-1] , wt , val , n-1)) > knapSack(W , wt , val , n-1):
        sizes.append(wt[n-1])#add the size of this element as it was found to have good value when included
        choices.append(n-1)##add the position of this element as it was found to have good value when included
        return val[n-1] + knapSack(W-wt[n-1] , wt , val , n-1), sizes , choices
      else:
        return knapSack(W , wt , val , n-1)
'''

def knapsack_solver(items, capacity):
  W=capacity
  val = []#array with the values, i.e. the utility/payoff
  for i in range(len(items)):
    val.append(items[i][2])
  
  wt = []#array with sizes/cost of the items
  for i in range(len(items)):
    wt.append(items[i][1])
  
  n = len(val)#size of the input list (the list that is on the input file)
  #value, sizes, choices = knapSack(W , wt , val , n)
  value = knapSack(W , wt , val , n)
  return value



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