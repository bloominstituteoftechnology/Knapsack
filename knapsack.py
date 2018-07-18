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
    # if it does, check the value we get from NOT taking the item vs
    # the value we get from taking it.        
    else:
        chosencopy = chosen.copy()
        chosencopy.append(items[index].index)
 
        novalue = knapsack_solver(index - 1, capacity, chosen)
        yesvalue = knapsack_solver(index - 1, capacity - items[index].size, chosencopy)

        yesvalue.value += items[index].value

        if novalue.value > yesvalue.value:
            return novalue 
        else:
           yesvalue.size += items[i].size
           yesvalue.chosen + yesvalue.chosen(i+1)
           return yesvalue 
    return knapsack_solver(len(items)-1, capacity)
                    


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
