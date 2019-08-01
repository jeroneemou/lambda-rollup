import express, { Request, Response } from 'express'
import { eventContext } from 'aws-serverless-express/middleware'

const app = express()

app.disable('x-powered-by');
app.use(eventContext())

app.get('/', (_req: Request, res: Response) => {
    res.json({
        "success": true
    })
})

export default app