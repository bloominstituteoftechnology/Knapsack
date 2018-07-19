#!/usr/bin/python

import sys
import pandas as pd
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
    W=capacity
    val = []#array with the values, i.e. the utility/payoff
    for i in range(len(items)):
        val.append(items[i][2])
  
    wt = []#array with sizes/cost of the items
    for i in range(len(items)):
        wt.append(items[i][1])

    ind = []#array with index or possition of the item (item number)
    for i in range(len(items)):
        ind.append(items[i][0])
    # put the previous 3 arrays into a pandas dataframe

    items_df = pd.DataFrame({'Item_Num': ind,'Item_Size': wt,'Item_Value': val})

    n = len(val)#size of the input list (the list that is on the input file)
    #create a new column with the ratio value/size
    items_df['ratio']=items_df['Item_Value'].divide(items_df['Item_Size'], axis=0)
  
    #delete the items that have a size bigger than the total capacity of the knapsack
    items1=items_df[items_df.Item_Size <= capacity]
    if items1.shape[0]==0: #there are no items that fit on the knapsack
        return None
    # sort the items by ratio in descending order
    else:
        items1=items1.sort_values(by=['ratio'], ascending=False)
        chosen_df = pd.DataFrame() 
        #space=True
        for i in range(items1.shape[0]):
            chosen_df.iloc[i:i+1,:]=items1.iloc[i:i+1,:]
            print(chosen_df.iloc[i:i+1,:])
        
        

    return True
  



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