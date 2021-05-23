import { Command } from './protocols'
import { Message, MessageEmbed } from 'discord.js'
import axios from 'axios'

export class CodeReviewCommand implements Command {
  commandNames = ['cr', 'codereview', 'revisar'];

  async run(message: Message): Promise<void> {
      const task = await axios.get(`https://gazinlabs.atlassian.net/rest/api/2/search?jql=status%20%3D%20%22Aguardando%20Revis%C3%A3o%22%20AND%20project%20%3D%20Ecommerce`, {
        'headers': { 'Authorization': `Basic ${process.env.JIRA_TOKEN}` },
      })
      const data = task.data.issues

      data.forEach((element: any) => {
        const embed: MessageEmbed = new MessageEmbed()
        const randomColor = Math.floor(Math.random()*16777215).toString(16)
    
        embed.setTitle(element.key)
        embed.setColor(randomColor)
        embed.setAuthor('Link JIRA','', `https://gazinlabs.atlassian.net/browse/${element.key}`)
        embed.setDescription(element.fields.summary)
        message.reply(embed)
      })
  } 
}
