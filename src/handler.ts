import {createServer, proxy} from 'aws-serverless-express'
import app from './app'

const server = createServer(app)

exports.handler = async (event: any = {}, context: any = {}) => {
    proxy(server, event, context)
};