#include <stdio.h>
#include <stdlib.h>
 
int main()
{
    FILE *fp = fopen("./data/small1.txt", "r");
    int values[10000] ={};
    int wts[1000]= {};
    int i=0, j=0;
    if (fp == NULL)
    {
        puts("something there");
        exit(0);
    }
    else
    {
        int dummyPtr = 0;
        int ch = getc(fp);
        while(ch != EOF){
            ch=getc(fp);
            values[i]=ch;
            i++;
        }
        puts("Done");
        fclose(fp);
    }
    for(int k = 0; k < 40; k++){
        printf("The value in %d\n",values[k]);
    }
    return 0;
}