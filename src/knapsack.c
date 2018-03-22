#include <stdio.h>

#define MAX_SIZE 1000

int main(int argc, char *argv[])
{
    //TODO: read command line argument to get file and size

    int maxWeight = 100; //todo read from command line
    FILE *fp;
    char buff[255];

    int weights[MAX_SIZE] = {0}; //todo magic numbers;
    int values[MAX_SIZE] = {0};  //todo magic numbers;
    int numObjects = 0;

    fp = fopen("../data/small1.txt", "r");

    int numberRead = 0; //bucket to store the last item read from file

    for (int i = 0; i < MAX_SIZE; i++) //todo magic numbers
    {
        for (int j = 0; j < 3; j++)
        {

            int found = fscanf(fp, "%d", &numberRead);
            if (found == 1)

            {
                switch (j)
                {
                case 0:
                    numObjects++;
                    break;
                case 1:
                    weights[i] = numberRead;
                    break;
                case 2:
                    values[i] = numberRead;
                    break;
                }
            }
        }
    }

    fclose(fp);

    // Sorts objects in descending order by value
    int temp;
    for (int i = 0; i < 10; i++)
    {
        for (int j = i + 1; j < 10; j++)
        {
            if (values[i] < values[j])
            {
                temp = weights[j];
                weights[j] = weights[i];
                weights[i] = temp;

                temp = values[j];
                values[j] = values[i];
                values[i] = temp;
            }
        }
    }

    // Adds up by highest value so that corresponding weight is less than or equal to 100

    int totalWeight = 0;
    int itemsSelected[10] = {0};
    int numItems = 0;
    printf("Highest value less than or equal to weight 100, added by highest values first, then 2nd, etc..\n");
    for (int i = 0; i < 10; i++)
    {
        totalWeight += weights[i];

        if (totalWeight <= maxWeight)
        {
            itemsSelected[numItems] = i;
            printf("item %d with weight of %d: value %d:\n", i, weights[i], values[i]);
        }
        else
        {
            totalWeight -= weights[i];
        }
    }
    printf("For a total weight of %d\n\n", totalWeight);
    printf("--------------------------------------------------\n");

    // Sorts objects in ascending order of weight
    temp;
    for (int i = 0; i < 10; i++)
    {
        for (int j = i + 1; j < 10; j++)
        {
            if (weights[i] > weights[j])
            {
                temp = weights[j];
                weights[j] = weights[i];
                weights[i] = temp;

                temp = values[j];
                values[j] = values[i];
                values[i] = temp;
            }
        }
    }

    totalWeight = 0;
    int itemsSelectedByWeight[10] = {0};
    numItems = 0;
    printf("Highest value less than or equal to weight 100, added by lowest weight first, then second, then thir, etc...\n");
    for (int i = 0; i < 10; i++)
    {
        totalWeight += weights[i];

        if (totalWeight <= maxWeight)
        {
            itemsSelected[numItems] = i;
            printf("item %d with weight of %d: value %d:\n", i, weights[i], values[i]);
        }
        else
        {
            totalWeight -= weights[i];
        }
    }
    printf("For a total weight of %d\n", totalWeight);
};