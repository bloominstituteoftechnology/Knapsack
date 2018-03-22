#include <stdio.h>

#define MAX_SIZE 100

int main (int argc, char *argv[])
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

    for (int i = 0; i < MAX_SIZE * 3; i++) //todo magic numbers
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
            printf("trying to get a number : %d\n", weights[3]);
            printf("we counted %d objects\n", numObjects);
        

    }
    fclose(fp);
}       