import express, { response } from "express"
export const router = express.Router();

export const greyhoundObj = [{
    name: 'ERROR',
    message: "no such greyhound",
    online: false
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
    online: false,
    lastOnline: 0
}

]

export const checkOnline = () => {
    greyhoundObj.forEach(element => {
        if (element.lastOnline > Date.now() - 120000) {
            element.online = false;
            console.log(element.name, " is now offline")
        }

    });

}

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
    console.log(greyhound)
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

router.put("/", (request, response) => {
    console.log('put end point reached')

    const greyhound = request.body;
    console.log(typeof greyhound)
    console.log('put greyhound:', greyhound)
    console.log(greyhound.name)
    let index = greyhoundObj.findIndex((g) => g.name === greyhound.name)
    console.log(index)
    if (index === -1) {
        greyhoundObj.push(greyhound)
        console.log(greyhoundObj)
        response.send("New Greyhound Saved")
    } else {
        Object.assign(greyhoundObj[index], greyhound)
        console.log(greyhoundObj)
        response.send('Saved')
    }
})

router.patch("/", (request, response) => {
    console.log('patch enpoint reached')
    let update = request.body;
    let index = greyhoundObj.findIndex((g) => g.name === update.name)
    if (index === -1) {
        console.log('update failed no know greyhound')
    } else { Object.assign(greyhoundObj[index], update) }

    const found = greyhoundObj.filter(element => element.name !== update.name && element.online === true)
    if (found.length > 0) {
        response.json(JSON.stringify(found))
    } else { response.json('empty') }
})