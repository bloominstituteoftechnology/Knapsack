#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  capacity = 10
  num_of_items = 6
  total_weight = 0
  total_value = 0 

  B=[[0]* (capacity+1) for i in range(num_of_items)];
  keep=[[0]* (capacity+1) for i in range(num_of_items)];

  item_weight={0:4, 1:2, 2:3, 3:1, 4:7, 5:10};
  item_value={0:6, 1:4, 2:5, 3:3, 4:9, 5:7};

  total_weight=sum([value for value in item_weight.values()])
  total_value=sum([value for value in item_value.values()])

  for k in range(num_of_items):
    for w in range(capacity+1):
      if(w>item_weight[k]):
        p1=B[k-1][w];
        p2=B[k-1][w-item_weight[k]+item_value[k]];
        if(p1>p2):
          keep[k][w]=0
          B[k][w]=p1
        else:
          keep[k][w]=0;
          B[k][w]=p1;
      else:
        B[k][w] = B[k-1][w];
        keep[k][w] = 0;

  rem_capacity=capacity;
  items_to_take=[];
  valueofgoods=0;

  for k in range(num_of_items-1, -1, -1):
    if (keep[k][rem_capacity]==1):
      items_to_take.append[k];
      rem_capacity=rem_capacity-item_weight[k];
      valueofgoods+=item_value[k];

  print('Total value of all goods: %s'%(total_value))
  print('Goods to choose: %s'%(items_to_take))
  print('Maximized Value of goods: %s'%(valueofgoods))
  print('Oppurunity cost: %s'%(total_value-valueofgoods))
    

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