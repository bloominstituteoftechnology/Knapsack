let items = [];
let capacity = [];

for(let i = 0; i < 5 ; i++){

    items.push(i);
}


let resultsMem = Array(items.length);

for (let s = 0; s < items.length; s++) {
    resultsMem[s] = Array(capacity + 1).fill(null);
}

function recurMemoized(i, size) {
    size = +size;
    let v = resultsMem[i][size];

    if (v === null) {
        v = recur(i, size);
        resultsMem[i][size] = Object.assign({}, v); // Make a copy of the object
    }

    return v;
}