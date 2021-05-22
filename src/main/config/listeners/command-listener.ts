import { Message } from 'discord.js'
import CommandHandler from '../../../commandHandler'
import env from '../env'

const commandHandler = new CommandHandler(env.prefix)

export default (message: Message): Promise<void> => {
  return commandHandler.handleMessage(message)
}