import { Command } from './protocols'
import { Message, MessageEmbed } from 'discord.js'


export class JiraCommand implements Command {
  commandNames = ['jira']

  async run(message: Message): Promise<void> {
    const embed = new MessageEmbed()

    embed.setTitle('COMO CONFIGURAR O TOKEN JIRA')
    embed.setDescription('Crie um token em  https://id.atlassian.com/manage/api-tokens. \n Com o token gerado chamar ">save <email>:<token>"')

    message.reply(embed)


  } 
}
