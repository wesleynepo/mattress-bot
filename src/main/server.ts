import app from "./config/app"
import env from "./config/env"
import client from './config/client'

client.login(env.token).then()
app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))