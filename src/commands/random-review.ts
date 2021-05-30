import { Command } from './protocols'
import { Message, MessageEmbed } from 'discord.js'
import { JiraHelper } from '../helper/jira-helper'

export class RandomReviewCommand implements Command {
  commandNames = ['rr', 'randomreview'];

  async run(message: Message): Promise<void> {
      const response = await JiraHelper.getIssuesForReview()
      const issues = response.data.issues

      const element = issues[Math.floor(Math.random() * issues.length)]

      const embed: MessageEmbed = new MessageEmbed()
      const randomColor = Math.floor(Math.random()*16777215).toString(16)
  
      embed.setTitle(element.key)
      embed.setColor(randomColor)
      embed.setAuthor('Link JIRA','', `https://gazinlabs.atlassian.net/browse/${element.key}`)
      embed.setDescription(element.fields.summary)
      message.reply(embed)
  } 
}
