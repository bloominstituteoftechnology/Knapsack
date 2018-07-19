#!/usr/bin/python

import sys
from collections import namedtuple
import time

Item = namedtuple('Item', ['index', 'size', 'value'])


def knapsack_solver(items, capacity):
    a = sorted(items, key=lambda x: x[2], reverse=True)
    # for tup in range(len(items)):
    #     print(a[tup])
    print(f'''\n\nSample's size: {len(items)}''')

    def firstAttempt(items, capacity):  # GREEDY
        iterationControl = 0
        sizeControl = 0
        value_picked_up = 0
        items_taken = '\nItems taken: '
        while iterationControl < len(items) and sizeControl < capacity:
            nextSize = sizeControl + items[iterationControl][1]
            if nextSize < capacity:
                sizeControl = nextSize
                value_picked_up += items[iterationControl][2]
                items_taken += f'''{str(items[iterationControl][0])} '''
            iterationControl += 1
        print('\nFirst Attemp:', items_taken, '\nSize: ',
              sizeControl, '\nValue: ', value_picked_up, '\n\nEND FIRST ATTEMP')
    # firstAttempt(a, capacity)

    def secondAttempt(items, capacity):  # BRUTE FORCE

        items_len = len(items)
        MAX = {
            'items': [],
            'size': 0,
            'value': 0,
        }
        control = {
            'items': [],
            'size': 0,
            'value': 0,
            'itemsPicked': [],
            'combinatories': [['Total combinations: to show total permutation un comment the related lines in PERMUTATIONS AND ITERATIONS ']],
            'iterations': 1,
        }

        # NOT WORKING ALGORITHM  -that was my first attempt with burte force
        def getMaxValue(level, control):
            # print(f'''\n\n{'*'*10}LEVEL: {level} -> START\n''')
            if level > items_len:
                return
            if level == 1:
                control['size'] = items[0][1]
                control['value'] = items[0][2]

            for x in items:
                # MAX['items'], MAX['size'], MAX['value'] = control['itemsPicked'], control['size'], control['value']
                print(f'''\n\DEEP: {control['itemsPicked']}''')
                print(MAX)
                print(f'''x: {x[0]}''')
                if x[0] not in control['itemsPicked']:
                    control['itemsPicked'].append(x[0])
                    for y in items:
                        print(f'''x: {x[0]}, y: {y[0]}''')
                        control['size'] += y[1]

                        if x[0] != y[0] and y[0] not in control['itemsPicked']:

                            print(f'''{control}''')
                            getMaxValue((level + 1), control)

                    control['itemsPicked'].remove(x[0])

        # getMaxValue(1, control)

        # Iterate over ALL posible combinations
        def getMAxValue2(level, items_passed):  # WORKING ALGORITHM
            if level > items_len:
                print(
                    f'''\n \LEVEL: {level} \DEEP: {control['itemsPicked']} - return''')
                return

            items_passed_len = len(items_passed)

            # print('\n\n\nITEMS PASSED:', items_passed)
            # print(len(items_passed))
            for x in items_passed:

                # print('for x in items_passed: x = ', x[0])
                # MAX['items'], MAX['size'], MAX['value'] = control['itemsPicked'], control['size'], control['value']
                # print(
                #     f'''\n\LEVEL: {level} \DEEP: {control['itemsPicked']}''')
                # # print('c:', control)
                # print(f'''x: {x[0]}''')

                # Add current Item to the picked up control
                control['itemsPicked'].append(x[0])
                # print(
                #     f'''{control['iterations']} Level: {level} - x: {x[0]} - items_picked: {control['itemsPicked']}''')
                # print('AFTER APPEND ITEM/DEEP\nc:',
                #       control['itemsPicked'], '\n')

                # PERMUTATIONS AND ITERATIONS
                control['iterations'] += 1
                control['combinatories'].append(control['itemsPicked'].copy())
                control['combinatories'][
                    0] = f'''Total combinations: {len(control['combinatories']) - 1}'''
                # print(f'''c: {control['combinatories'][-1]}\n''')

                # ADD TO BAG LOGIC
                # Get current_level items' size
                current_level_size = 0
                for index in control['itemsPicked']:
                    current_level_size += items[index - 1][1]

                # There is a bug reading the capacity from the command line -> it get incremented always by 1 => So I subtract 1 in the comparison here
                # False if we want all posible permutations (check next if statement: It prints all posible permutations)
                if True and current_level_size <= capacity - 1:
                    # Get current_level items' value
                    current_level_value = 0
                    for index in control['itemsPicked']:
                        current_level_value += items[index - 1][2]

                    # Compare Level_value with Bag_value
                    if current_level_value > MAX['value']:
                        MAX['items'] = control['itemsPicked'].copy()
                        MAX['size'] = current_level_size
                        MAX['value'] = current_level_value

                    # GO TO NEXT LEVEL:
                    # (NESTED FOR LOOP) - Iterate again over the items_passed
                    for y in items_passed:
                        # print(f'''x: {x[0]}, y: {y[0]}''')

                        # GO TO NEXT LEVEL IF AND ONLY IF: 'txt file line' is not the same
                        if x[0] != y[0]:

                            new_items_to_pass = [
                                x for x in items_passed if x[0] not in control['itemsPicked']]
                            # for x in new_items_to_pass:
                            #     print(x[0], x)
                            # print('LEN of new_items_to_pass', len(
                            #     new_items_to_pass), new_items_to_pass)

                            getMAxValue2((level + 1), new_items_to_pass)

                if False:  # True: Print all posible Permutations
                    # print('FALSE')
                    for y in items_passed:
                        # print(f'''x: {x[0]}, y: {y[0]}''')

                        # GO TO NEXT LEVEL IF AND ONLY IF: 'txt file line' is not the same
                        if x[0] != y[0]:

                            new_items_to_pass = [
                                x for x in items_passed if x[0] not in control['itemsPicked']]
                            # for x in new_items_to_pass:
                            #     print(x[0], x)
                            # print('LEN of new_items_to_pass', len(
                            #     new_items_to_pass), new_items_to_pass)

                            getMAxValue2((level + 1), new_items_to_pass)

                # print(
                #     f'''Level: {level} - x: {x[0]} - items_picked: {control['itemsPicked']}''')
                if x[0] in control['itemsPicked']:
                    control['itemsPicked'].remove(x[0])

        getMAxValue2(1, items)
        print(
            f'''\n**********BRUTAL FORCE**********\nCONTROL:\n\tCapacity readed by the default implementation: {capacity}\n\tCapacity passed in the CLI: {capacity - 1}\n\tIterations: {control['iterations']}\n\tPermutations: {control['combinatories'][0]}\n\tSize: {MAX['size']}\n\tValue: {MAX['value']}\n\tItems picked: {MAX['items']}\n\nEND''')

        def getMAxValue2_handle_add_to_bag():
            pass

    start_time = time.clock()
    secondAttempt(items, capacity + 1)
    print(f'''\n\nTime runned: {(time.clock() - start_time) / 60} minutes''')


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


#  SEAN BRUTE FORCE
