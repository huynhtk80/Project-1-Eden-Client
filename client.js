import fetch from 'node-fetch';

const body = {
    "name": "ruebin",
    "breadtype": "rye",
    "ingredients": [
        "cheese",
        "meat",
        "mustard",
        "pickles"
    ]
}

// const response = await fetch('http://localhost:4001/sandwiches', {
//     method: 'post',
//     body: JSON.stringify(body),
//     headers: { 'Content-Type': 'application/json' }
// });
// const data = await response.json();

// console.log(data);

const response = await fetch('http://localhost:4001/sandwiches', {
    method: 'get',
});
const data = await response.json();
console.log(data);