import { Message } from 'discord.js'
import { CodeReviewCommand, IssueInfoCommand, NotFoundCommand } from './commands'
import { Command } from './commands/protocols'
import { CommandParser } from './models/command-parser'

export class CommandHandler {
  private readonly commandParser: CommandParser
  private commands: Command[];

  constructor(commandParser: CommandParser) {

    const commandClasses = [
      IssueInfoCommand,
      CodeReviewCommand
    ]
    this.commandParser = commandParser
    this.commands = commandClasses.map(commandClass => new commandClass())
  }

  async handleMessage(message: Message): Promise<void> {
    if (!this.commandParser.isValidMessage(message)) {
      return
    }

    const command = this.findCommand(message)

    try {
      command.run(message)
    } catch (error) {
      message.reply(`Command failed because of ${error}`)
    }
   
  }

  findCommand(message: Message): Command {
    const parsedCommand = this.commandParser.parse(message)
    const command = this.commands.find(command => command.commandNames.includes(parsedCommand.parsedCommand)) 

    return command ?? new NotFoundCommand()
  }
}
