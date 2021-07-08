#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_ITEMS 2000

struct Item // Just like classes in JavaScript (template)
{
    int id;
    float weight;
    float value;
    float quality;
    int is_selected; // acts like a boolean
};

int loadfile(char fpath[], struct Item items[])
{
    FILE *fp; // I'm saying *fp is a type file
    //TODO: LOAD FILE
    fp = fopen(fpath, "r");

    int itemcount = 0; // my notepad to remember things
    int numberRead = 0;

    int i = 0;
    int found = 1; // if something is found (best case)

    while(found > 0)
    {
        i++; // for each item or line
        for (int n = 0; n < 3; n++) // iterating through properties (id, weight, value)
        {
            found = fscanf(fp, "%d", &numberRead);
            if(found > 0)
            {
                itemcount++;
                switch(n)
                {
                    case 0:
                        items[i].id = numberRead;
                        break;
                    case 1:
                        items[i].weight = numberRead;
                        break;
                    case 2:
                        items[i].value = numberRead;
                        items[i].quality = items[i].value / items[i].weight;
                        break;
                }
            }
        }
    }
    fclose(fp);
    return itemcount / 3;
}

int bestQuality(const void *item1, const void *item2)
{
    struct Item *quality1 = (struct Item*)item1;
    struct Item *quality2 = (struct Item *)item2;
    if(quality1->quality > quality2->quality)
    {
        return -1;
    } 
    else 
    {
        return 1;
    }
}

int fillBag(int maxweight, int itemcount, struct Item items[], int bagreturns[])
{
    int weightleft = maxweight;
    int totalvalue = 0;
    int itemsinbag = 0;

    for (int i = 0; i < itemcount; i++)
    {
        if(items[i].weight < weightleft)
        {
            weightleft -= items[i].weight;
            totalvalue += items[i].value;
            items[i].is_selected = 1;
            itemsinbag++;
        }
    }
    bagreturns[0] = maxweight - weightleft;  // this is my cost
    bagreturns[1] = totalvalue;
    bagreturns[2] = itemsinbag;

    return 0;
}

int main()
{
    struct Item items[MAX_ITEMS] = {{0}}; // in the case of struct template --> invented name (items) [MAX_ITEMS] then zero is out with {{}}

    int maxweight = 100;
    int bagreturns[3] = {0};

    int itemcount = loadfile("./data/small1.txt", items); // step 1 is load file in
    qsort(items, itemcount + 1, sizeof(struct Item), bestQuality); // step 2 is sorting the array
    fillBag(maxweight, itemcount, items, bagreturns);


    printf("Items to select: ");
    int commacount = 0;
    for (int i = 0; i < MAX_ITEMS; i++)
    {
        if(items[i].is_selected == 1)
        {
            printf("%d", items[i].id);
            if(commacount < bagreturns[2] - 1)
            {
                commacount++;
                printf(", ");
            }
            else
            {
                printf("\n");
                
            }
        }
    }
    printf("Total cost: %d\n", bagreturns[0]);
    printf("Total value: %d\n", bagreturns[1]);
    return 0;
}