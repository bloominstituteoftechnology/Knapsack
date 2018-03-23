#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define maxitems 2000

struct item
{
    int id;
    float weight;
    float value;
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

    if (ia->quality > ib->quality)
    {
        return 1;
    }
    else
    {
        return -1;
    }
}

//Utility function to evaluate our best possible scenario for the knapsack problem
int ksmine(int maxWt, int n, struct item items[], int returns[])
{
    int remainingWt = maxWt;
    int total = 0;
    int count = 0;
    for (int i = n; i > 0; i--) // Transverse our array of structs in reverse
    {
        int itemWt = items[i].weight;
        if (itemWt < remainingWt)
        {
            remainingWt = remainingWt - itemWt;
            total += items[i].value;
            items[i].selected = 1;
            count = count + 1;
        }
    }
    returns[0] = maxWt - remainingWt; // Returns 0 is cost
    returns[1] = total;               // Returns 1 is my total
    returns[2] = count;               // How many items in bag

    return total;
}

int main(int argc, char *argv[])
{
    // TODO GET THE MAX ITEMS FIGURED OUT!
    int maxWeight = 100;                 // TODO GET FROM CONSOLE ARGS
    struct item items[maxitems] = {{0}}; // Initialize our array of structs with 0.
    int returns[5] = {0};                // Closure Array

    int itemCount = loadfile("./data/small1.txt", items);          // (1) load the file and parse it into our array of structs
    qsort(items, itemCount + 1, sizeof(struct item), qualitysort); // (2) Sort our ingested array of structs
    ksmine(maxWeight, itemCount, items, returns);                  // (3) Transverse our array backwards and load until full.

    // -------------------------------------------------------------------------------------
    // DEBUGGING PROMPTS BEGIN
    // printf("\n ### --- DEBUGGING STUFF BEGINS HERE --- ### \n\n");
    // PLACE DEBUGGING PROMPTS AFTER THIS LINE!

    // printf("Our File contains %d items: \n", itemCount);
    // for (int i = 0; i < maxitems; i++) // print our array of structs
    // {
    //     if (items[i].id > 0)
    //     {
    //         printf("item id %d\tweight %f\tvalue %f\tquality %f\tselected? %d\n",
    //                items[i].id,
    //                items[i].weight,
    //                items[i].value,
    //                items[i].quality,
    //                items[i].selected);
    //     }
    // }

    printf("Items to select: ");
    int myCounts = returns[2];
    int innerCount = 0;
    for (int i = 0; i < maxitems; i++) // print our array of structs
    {

        if (items[i].selected > 0)
        {

            printf("%d", items[i].id);

            if (innerCount < myCounts - 1)
            {
                innerCount++;
                printf(", ");
            }
            else
            {
                printf("\n");
            }
        }
    }
    printf("Total cost: %d\n", returns[0]);
    printf("Total value: %d\n", returns[1]);

    // NO DEBUGGING PROMPTS AFTER THIS LINE!
    // printf("\n ### --- DEBUGGING STUFF BEGINS HERE --- ### \n\n");
    // DEBUGGING PROMPTS END
    // -------------------------------------------------------------------------------------
}