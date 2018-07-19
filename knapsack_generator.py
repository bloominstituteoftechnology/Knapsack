import random
import os
from time import sleep
import sys

clear = lambda: os.system("cls")

c = input("How many lines do you want of random numbers? \n =>")
file_name = input("what do you want to name this? \n =>")
# random generator for the tuples
if __name__ == "__main__":

    def tuple_maker(file_name, c):

        file = open(f"{file_name}.txt", "+w")

        d = random.randint(1, 200)
        e = random.randint(1, 200)

        for i in range(c):
            file.write(f"{i} {e} {d} \n"(i + 1))

        file.close()


if __name__ == "__main__":
    if len(sys.argv) > 1:
        capacity = int(sys.argv[2])
        file_location = sys.argv[1].strip()
        file_contents = open(file_location, "r")
        items = []

        for line in file_contents.readlines():
            data = line.rstrip().split()
            items.append(Item(int(data[0]), int(data[1]), int(data[2])))

        file_contents.close()
        new_path = ".\log\OUTPUT.txt"
        file = open(new_path, "a")
        file.write(
            f"========================================\n{sys.argv[1]} \n {sys.argv[2]} \n log \n {knapsack_solver(items, capacity)} \n \n========================================\n"
        )
        file.close()
        clear()
    else:
        print("Usage: knapsack.py [filename] [capacity]")

