import app from './config/app'
import env from './config/env'
import client from './config/client'
import { MongoHelper } from '../helper/mongo-helper'

MongoHelper.connect(env.mongoUrl).catch(console.error)
client.login(env.token).then()
app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
