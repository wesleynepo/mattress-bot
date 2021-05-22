import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export default {
  port: process.env.PORT ?? 5400,
  prefix: process.env.PREFIX ?? '>',
  token: process.env.TOKEN
}