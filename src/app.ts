import express from 'express'
import { eventContext } from 'aws-serverless-express/middleware'

const app = express()

// Get request details from lambda event
app.use(eventContext())

app.get('/', (req, res) => {
    res.json(req.apiGateway.event)
})

export default app