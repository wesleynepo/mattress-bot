import { Command } from './protocols'
import { Message } from 'discord.js'

export class CodeReviewCommand implements Command {
  commandNames = ['cr', 'codereview'];

  async run(message: Message): Promise<void> { 
    await message.reply('There is no cards to review!')
  }
}
