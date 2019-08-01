import {createServer, proxy} from 'aws-serverless-express'
import app from './app'

const server = createServer(app)

exports.handler = (event: any = {}, context: any = {}) => {
    proxy(server, event, context)
};