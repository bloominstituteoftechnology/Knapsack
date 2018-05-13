const mainObj = {   
    banana: [5, 33],
    apple:  [1, 12],
    kiwi:   [1, 7]
};

function knapsack(obj, max_cost){
    var arr = [];
    for (key in obj){
        arr.push({c: obj[key][0], b: obj[key][1], n: key});
    }
    
    arr.sort((a, b) => {
        if (a.b >= b.b){
            return a.c - b.c;
        }
        return b.b - a.b;
    })

    console.log(arr);
}

knapsack(mainObj, 6);