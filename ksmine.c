#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define maxitems 2000

struct item
{
    int id;
    int weight;
    int value;
    float quality;
    int selected;
};

// Utility function to load and parse the contents of a file.
int loadfile(char *fpath, struct item items[])
{
    // DECLARE VARIABLES HERE
    FILE *fp;           // To hold the contents of the file we are going to open.
    int numberRead = 0; // To hold each number we parse from the file.
    int itemCount = 0;  // The function will return this integer.

    fp = fopen(fpath, "r");

    int i = 0;
    int found = 1;

    // If we keep finding numbers, parse them!
    // Hopefully nobody will get smart and make a very large file...
    while (found > 0)
    {
        i++;
        for (int j = 0; j < 3; j++)
        {
            found = fscanf(fp, "%d", &numberRead);
            if (found > 0)
            {
                itemCount++;
                switch (j)
                {
                case 0:
                    // Save number read as the index of the item
                    items[i].id = numberRead;
                    break;
                case 1:
                    // Save number read as the weight of the item
                    items[i].weight = numberRead;
                    break;
                case 2:
                    // Save number read as the value of the item
                    items[i].value = numberRead;
                    items[i].quality = items[i].value / items[i].weight;
                    break;
                }
            }
        }
    }

    fclose(fp);
    return itemCount / 3;
}

int qualitysort(const void *a, const void *b)
{
    struct item *ia = (struct item *)a;
    struct item *ib = (struct item *)b;
    return (int)(ia->quality - ib->quality);
}

//Utility function to evaluate our best posible scenarion for the knapsack problem
int knapsack(int maxWt, int n, struct item items[], int solution[])
{
    memset(solution, 0, (maxitems * sizeof(int)));
    // If we have no items, or our weight is 0 then stop trying to fill.
    if (n == 0 || maxWt == 0)
    {
        return 0;
    }
    // If Weight of item Exceeds our Allowed Total Weight
    // Recursivelly call the next item down the list.
    if (items[n - 1].weight > maxWt)
    {
        return knapsack(maxWt, n - 1, items, solution);
    }
    // Zero Out array: memset(solution, 0, (maxitems * sizeof(int)));
    // Otherwise lets compute our best possible scenario
    else
    {
        int option1 = items[n - 1].value + knapsack(maxWt - items[n - 1].weight, n - 1, items, solution);
        int option2 = knapsack(maxWt, n - 1, items, solution);
        int maxNum;

        if (option1 > option2)

        {
            solution[n - 1] = n - 1;
            maxNum = option1;
        }
        else
        {
            solution[n - 1] = 0;
            maxNum = option2;
        }

        return maxNum;
    }
}

int ksmine(int maxWt, int n, struct item items[])
{
    int remainingWt = maxWt;
    for (int i = n; i > 0; i--) // Transverse our array of structs in reverse
    {
        int itemWt = items[i].weight;
        if (itemWt < remainingWt)
        {
            remainingWt = remainingWt - itemWt;
            items[i].selected = 1;
        }
    }
}

int main(int argc, char *argv[])
{
    // TODO GET THE MAX ITEMS FIGURED OUT!
    int maxWeight = 100; // TODO GET FROM CONSOLE ARGS

    struct item items[maxitems] = {{0}}; // Initialize our array of structs with 0.
    int solution[maxitems] = {0};        // Initialize our array

    int itemCount = loadfile("./data/mine.txt", items); // load the file and parse it into our array of structs
    qsort(items, itemCount, sizeof(struct item), qualitysort);
    int bestcase = knapsack(maxWeight, itemCount, items, solution);

    // -------------------------------------------------------------------------------------
    // DEBUGGING PROMPTS BEGIN
    printf("\n ### --- DEBUGGING STUFF BEGINS HERE --- ### \n\n");
    // PLACE DEBUGGING PROMPTS AFTER THIS LINE!

    printf("Our File contains %d items: \n", itemCount);
    for (int i = 0; i < maxitems; i++) // print our array of structs
    {
        if (items[i].id > 0)
        {
            printf("item id %d\tweight %d\tvalue %d\tquality %f\tselected? %d\n", items[i].id, items[i].weight, items[i].value, items[i].quality, items[i].selected);
        }
    }

    printf("\n\nOur Best Case is %d:\n", bestcase);
    for (int i = 0; i < itemCount; i++) // print our array of structs
    {
        //if (solution[i] > 0)
        //{
        printf("item id %d\n", solution[i]);
        //}
    }

    // NO DEBUGGING PROMPTS AFTER THIS LINE!
    printf("\n ### --- DEBUGGING STUFF BEGINS HERE --- ### \n\n");
    // DEBUGGING PROMPTS END
    // -------------------------------------------------------------------------------------
}