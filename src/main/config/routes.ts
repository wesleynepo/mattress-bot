import { Express, Request, Response } from 'express'

export default (app:Express): void => {
  app.use('/', (request: Request, response: Response) => {
    response.sendStatus(200)
  })
}