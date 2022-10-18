import express from "express"
import { router as sandwichRouter } from './routes/sandwiches.js'

const app = express();
const PORT = 4001;
app.use(express.json());

app.use('/sandwiches', sandwichRouter)


app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`)
})




