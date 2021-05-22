import { Message } from 'discord.js'

export interface Command {
  readonly commandNames: string[];

  run(parsedUserCommand: Message): Promise<void>;
}
