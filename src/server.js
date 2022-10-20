import express from "express"
import { router as edenRouter } from './routes/edenObj.js'

const app = express();
const PORT = 4002;
app.use(express.json());

app.use('/edenobj', edenRouter)


app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`)
})




