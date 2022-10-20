import express from "express"
export const router = express.Router();

export const edenObjS = {
    icon: 'E',
    name: 'Eden',
    locx: 15,
    locy: 15,
    CurStamina: 100,
    maxStamina: 100,
    hunger: 0,
    thirsty: 0,
    bladder: 0,
    experience: 0,
    level: 1,
    online: 0
}

router.get("/", (request, response) => {
    response.send(edenObjS)
})

router.post("/", (request, response) => {
    let sandwich = request.body;
    let sandwiches = createSandwiches(sandwich)
    response.json(sandwiches)
})

router.delete("/", (request, response) => {
    const sandwich = request.body;
    let sandwiches = deleteSandwiches(sandwich.name)
    response.json(sandwiches)
})

router.put("/:id", (request, response) => {
    const sandwich = request.body;
    const sandwichId = Number(request.params.id);
    let sandwiches = updateSandwiches(sandwichId, sandwich)
    response.json(sandwiches)
})