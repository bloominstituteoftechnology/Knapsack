#include <stdio.h> // contains printf
#include <stdlib.h> // contains FILE

int main(void) {

    FILE* file;
    file = fopen("./data/small3.txt", "r"); // 'r' is for reading
    int index, weight, value;
    int arrIndex[11], arrWeight[11], arrValue[11];
    int i = 1;
    while (!feof(file)) {
        fscanf(file, "%d %d %d", &index, &weight, &value);
        arrIndex[i] = index;
        arrWeight[i] = weight;
        arrValue[i] = value;
        i++;
    }
    for (int i = 1; i < sizeof(arrWeight)/sizeof(arrWeight[0]); i++) {
        printf("%d ", arrIndex[i]); 
        printf("%d ", arrWeight[i]);  
        printf("%d\n", arrValue[i]);
    }
    int myWeight;
    int currentVal;
    int highestVal;
    int weightMax;
    int n = sizeof(arrValue)/sizeof(arrValue[0]);
    char* concatinatedInt = "";
    char* storeIndex;
    char str[100];
    char* indexUsed;
    char* storeMaxIndex;
    for (int b = 1; b < n; b++) {
        // bug where indexUsed is somehow being changed outside the inner if statement
        printf("%s\n", indexUsed);
        for (int j = 1; j < n; j++) {
            if (j == b) {
                continue;
            }
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
        }
    }
    printf("%s, %d, %d\n", indexUsed, weightMax, highestVal);
    fclose(file);
    return 0;
}


