import { Message } from 'discord.js'
import { CommandHandler } from '../../../command-handler'
import { CommandParser } from '../../../models/command-parser'
import env from '../env'

const commandHandler = new CommandHandler(new CommandParser(env.prefix))

export default (message: Message): Promise<void> => {
  return commandHandler.handleMessage(message)
}