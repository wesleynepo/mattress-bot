import { Client } from "discord.js"
import setupListeners from './listeners'

const client = new Client()
setupListeners(client)

export default client