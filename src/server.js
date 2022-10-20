import express from "express"
import { router as datasetRouter } from './routes/datasets.js'

const app = express();
const PORT = 4001;
app.use(express.json());

app.use('/data', datasetRouter)


app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`)
})




