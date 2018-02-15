#include <stdio.h> // contains printf
//#include <stdlib.h> // contains FILE
int max(int a, int b) { 
    return (a > b)? a : b; 
}
    
int main(void) {

    FILE* file;
    file = fopen("./data/small2.txt", "r"); // 'r' is for reading
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
    int savedIndex[11];
    int weightMax = 100;
    int n = sizeof(arrValue)/sizeof(arrValue[0]);
    int knap[n+1][weightMax + 1]; 
    for (int i = 0; i <= n; i++) {
       for (int j = 0; j <= weightMax; j++) {
            if (i==0 || j==0) {
                knap[i][j] = 0;
            } else if (arrWeight[i-1] <= j) {
               knap[i][j] = max(arrValue[i-1] + knap[i-1][j - arrWeight[i-1]],  knap[i-1][j]);
            }  else {
                knap[i][j] = knap[i-1][j];
            }      
        }
    }

   printf("%d\n", knap[n][weightMax]);
   // printf("%d, %d\n", myweight, myvalue);


    fclose(file);
    return 0;
}


