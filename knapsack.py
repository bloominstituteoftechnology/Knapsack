#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity, index=0, value=0, chosen=[]):
    # !!!! IMPLEMENT ME
    # Stop recursing!

    if index >= len(items):
        return[value, chosen] 
    
    # since you have an empty bag, start by checking the first item
    # does it fit? If not, recurse.
  
    if items[index].size > capacity:
        return knapsack_solver(items, capacity, index + 1, value, chosen)
 
    # if it does, check the value we get from NOT taking the item
    # (novalue) vs the value we get from taking it (yesvalue).

    else:
    # trying to not ruin the actual array/list 
        chosencopy = chosen.copy()
        chosencopy.append(items[index].index)
 
        novalue = knapsack_solver(items, capacity, index+1, value, chosen)
        yesvalue = knapsack_solver(items, capacity - items[index].size, index+1, value + items[index].value, chosencopy)
    #    print(novalue)
    #    print(yesvalue)
        if novalue[0] > yesvalue[0]:
            return novalue 
        else:
           return yesvalue 
                    
def anotherks(items, capacity):

    # calculate value/size ratio for each item to determine optimal results
    # sort items list so that optimal results come first
    # take items off the top and put into your knapsack until it's full

    # So I think first you make an empty array/list and set initial values to
    # zero for starters. 
    chosen = []
    size = 0
    value = 0

    # find the value/size ratio for each item
    # sort chosen array so that highest ratios come first

    # then as long as there is room in the bag (capacity), add items to the
    # chosen array. Each time you add an item be sure to add the size and value
    # to the total count so you don't overfill your bag.



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
