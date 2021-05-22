import Command from "./commandInterface"
import { Message } from "discord.js"

export class CodeReviewCommand implements Command {
  commandNames = ["cr", "codereview"];

  help(commandPrefix: string): string {
    return `Use ${commandPrefix}see if there is any code reviews to do.`
  }

  async run(message: Message): Promise<void> {

    

    await message.reply("There is n cards to review!")
  }
}
