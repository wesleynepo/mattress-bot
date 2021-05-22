import express from 'express'
import setupRoutes from './routes'

const app = express()
express.urlencoded({ extended: true })
app.use(express.urlencoded({ extended: true }))

setupRoutes(app)

export default app