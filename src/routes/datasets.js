import express from "express"
export const router = express.Router();


router.get("/", (request, response) => {
    const sandwiches = listAllSandwiches();
    response.send(sandwiches)
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