import express, { response } from "express"
export const router = express.Router();

export const greyhoundObj = [{
    name: 'ERROR',
    message: "no such greyhound"
},
{
    icon: 'A',
    name: 'TEST',
    loc: { x: 20, y: 5 },
    CurStamina: 100,
    maxStamina: 100,
    hunger: 0,
    thirsty: 0,
    bladder: 0,
    experience: 0,
    level: 1,
    online: 0,
    lastOnline: 0
}

]

router.get("/", (request, response) => {
    console.log('load grey point reached')
    let name = request.query.name
    console.log(name)
    let index = greyhoundObj.findIndex((g) => g.name === name)
    console.log(index)
    if (index === -1) {
        console.log(greyhoundObj[0])
        response.json(greyhoundObj[0])
    } else {
        console.log(greyhoundObj[index])
        response.json(greyhoundObj[index])
    }

})

router.post("/", (request, response) => {
    let greyhound = request.body;
    let index = greyhoundObj.findIndex((g) => g.name === greyhound.name)
    if (index === -1) {
        greyhoundObj.push(greyhound)
        console.log(greyhoundObj)
        response.send("uploaded")
    } else
        response.send('try again')
})

// router.delete("/", (request, response) => {
//     const sandwich = request.body;
//     let sandwiches = deleteSandwiches(sandwich.name)
//     response.json(sandwiches)
// })

// router.put("/:id", (request, response) => {
//     const sandwich = request.body;
//     const sandwichId = Number(request.params.id);
//     let sandwiches = updateSandwiches(sandwichId, sandwich)
//     response.json(sandwiches)
// })