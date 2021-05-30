import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export default {
  port: process.env.PORT ?? 5410,
  prefix: process.env.PREFIX ?? '>',
  token: process.env.TOKEN,
  mongoUrl: process.env.MONGO_URL || 'local'
}