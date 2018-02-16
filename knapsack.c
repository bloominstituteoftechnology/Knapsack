#include <stdio.h> // contains printf
#include <stdlib.h> // contains FILE

int main(void) {

    FILE* file;
    file = fopen("./data/small3.txt", "r"); // 'r' is for reading
    int index, weight, value;
    int num = 11;
    int arrIndex[num], arrWeight[num], arrValue[num];
    int i = 1;
    while (!feof(file)) {
        fscanf(file, "%d %d %d", &index, &weight, &value);
        arrIndex[i] = index;
        arrWeight[i] = weight;
        arrValue[i] = value;
        i++;
    }
    for (int i = 1; i < num; i++) {
        printf("%d %d %d", arrIndex[i], arrWeight[i], arrWeight[i]); 
    }
    int myWeight;
    int currentVal;
    int highestVal;
    int weightMax;
    char* concatinatedInt = "";
    char* storeIndex;
    char str[100];
    char* indexUsed;
    char* storeMaxIndex;
    for (int b = 1; b < num; b++) {
        // bug where indexUsed is somehow being changed outside the inner if statement
        currentVal = arrValue[i];
        //printf("%s\n", indexUsed);
        int j = b + 1;
         if (j == num) {
                j = 1;
        }
        while (j != b) {
            printf("%d\n", j);
            if ((myWeight + arrWeight[j] >= 100) && currentVal > highestVal) {
                // bug where indexUsed should only be changed in this inner if statement
                // but seem to changing outside of it. 
                highestVal = currentVal;
                weightMax = myWeight;
                indexUsed = concatinatedInt;
                printf("%s\n", indexUsed);
            }
            if (myWeight + arrWeight[j] >= 100) {    // printf("%s\n", indexUsed);
                currentVal = 0;
                myWeight = 0;
                concatinatedInt = "";
            }
            currentVal += arrValue[j];
            myWeight += arrWeight[j];

            sprintf(str, "%s %d", concatinatedInt, arrIndex[j]);
            int result=strtol(str, NULL, 10);
            concatinatedInt = str;
            j++;
            if (j == num) {
                j = 1;
            }
        }
    }
    printf("\nThe indices that make up the max value include: %s.", indexUsed);
    printf("\n The total weight is %d.", weightMax);
    printf("\n The max value is %d.\n", highestVal);
    fclose(file);
    return 0;
}


