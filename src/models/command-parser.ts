import { Message } from 'discord.js'

export interface ParsedMessage {
  parsedCommand: string,
  arguments: string[]
  originalMessage: Message
}

export class CommandParser {
  readonly commandPrefix: string;

  constructor(prefix: string) {
    this.commandPrefix = prefix
  }

  parse(message: Message): ParsedMessage {   
    const splitMessage = message.content.slice(this.commandPrefix.length).trim().split(/ +/g)
    const commandName = splitMessage.shift() || ''

    return {
      parsedCommand: commandName.toLowerCase(),
      arguments: splitMessage,
      originalMessage: message
    }
  }

  isValidMessage(message: Message): boolean {
    return message.content.startsWith(this.commandPrefix) && !message.author.bot
  }
}