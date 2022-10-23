import express from "express"
import { checkOnline, router as edenRouter } from './routes/greyhoundObj.js'

const app = express();
const PORT = 4002;
app.use(express.json());

app.use('/greyhound', edenRouter)


app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`)
})




setInterval(checkOnline, 120000)

