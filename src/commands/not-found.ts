import { Message } from 'discord.js'
import { Command } from './protocols/'

export class NotFoundCommand implements Command {
  commandNames = ['notfound']

  async run(message: Message): Promise<void> {
    message.reply('Command not found!')
  }
}