#include <stdio.h> // contains printf
#include <stdlib.h> // contains FILE

int main(void) {

    FILE* file;
    file = fopen("./data/small1.txt", "r"); // 'r' is for reading
    int index, weight, value, temp;
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
        printf("%d %d %d\n", arrIndex[i], arrWeight[i], arrValue[i]); 
    }
    
    int ratio[num];
    for (int b = 1; b < num; b++) {
        ratio[b] = arrValue[b]/arrWeight[b];    
    }
    for (int i = 1; i < num; i++) {
        for (int j = i + 1; j < num; j++) {
            if (ratio[i] < ratio[j]) {
                temp = ratio[j];
                ratio[j] = ratio[i];
                ratio[i] = temp;
    
                temp = arrWeight[j];
                arrWeight[j] = arrWeight[i];
                arrWeight[i] = temp;
    
                temp = arrValue[j];
                arrValue[j] = arrValue[i];
                arrValue[i] = temp;

                temp = arrIndex[j];
                arrIndex[j] = arrIndex[i];
                arrIndex[i] = temp;
            }
        }
    }
    for (int i = 1; i < num; i++) {
        printf("%d %d %d\n", arrIndex[i], arrWeight[i], arrValue[i]); 
    }

    int x[20], tp = 0;
    int a, j;
    int capacity = 100;
 
 
    for (a = 1; a < num; a++) {
        x[a] = 0;
    }
  
    for (a = 1; a < num; a++) {
        if (arrWeight[a] > capacity) {
            break;
        } else {
              x[a] = 1;
              tp = tp + arrValue[a];
              capacity = capacity - arrWeight[a];
            }
    }
 
    if (a < capacity)
      x[a] = capacity / arrWeight[a];
 
    tp = tp + (x[a] * arrValue[a]);
    int weightTotal;
    printf("\nThe indices that make up the max value includes ");
    for (a = 0; a < num; a++) {
        if (x[a] == 1) {
           printf("%d ", arrIndex[a]);
           weightTotal += arrWeight[a];
        }
    }
    printf("\n The total weight is %d.", weightTotal);
    printf("\n The max value is %d,\n", tp);
}
