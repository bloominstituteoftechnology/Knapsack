#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
    # !!!! IMPLEMENT ME
    def bruteforce(i, size):
    # set everything to 0 to start off 
        if i == 0:
            chosen = []
            size = 0
            value = 0
    # since you have an empty bag, start by checking the first item
    # does it fit? If not, recurse.
        elif items[i].size > size:
            return bruteforce(i - 1, size)
    # if it does, check the value we get from NOT taking the item vs
    # the value we get from taking it.        
        else:
            recurse0 = bruteforce(i - 1, size)
            recurse1 = bruteforce(i - 1, size - items[i].size)
            if recurse0.value > recurse1.value:
                return recurse0
            else:
               recurse1.size += items[i].size
               recurse1.chosen + recurse1.chosen(i+1)
               return recurse1
    return bruteforce(len(items)-1, capacity)
                    


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
