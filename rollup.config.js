import typescript from 'rollup-plugin-typescript'

// Define environments
const PRODUCTION_ENV = 'production'
const DEVELOPMENT_ENV = 'development'

// Initialise environment
process.env.NODE_ENV = process.env.NODE_ENV || PRODUCTION_ENV
const isProd = process.env.NODE_ENV === PRODUCTION_ENV

module.exports = {
    input: isProd ? 'src/handler.ts' : 'src/server.ts',
    output: {
        file: 'dist/handler.js',
        format: 'cjs'
    },
    plugins: [
        typescript()
    ],
    external: [
        'aws-serverless-express',
        'express',
        'aws-serverless-express/middleware'
    ]
};