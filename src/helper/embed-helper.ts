import { MessageEmbed } from 'discord.js'
import { IssueLongJira, IssueShortJira } from './protocols/embed-issue'

export const EmbedHelper = {

  randomColor(): string {
    return Math.floor(Math.random()*16777215).toString(16)
  },

  formatIssueShort(issue: IssueShortJira): MessageEmbed {
    const embed: MessageEmbed = new MessageEmbed()

    embed.setTitle(issue.key)
    embed.setColor(this.randomColor())
    embed.setAuthor('Link JIRA','', `https://gazinlabs.atlassian.net/browse/${issue.key}`)
    embed.setDescription(issue.description)

    return embed
  },

  formatIssueLong(issue: IssueLongJira): MessageEmbed {
    const embed: MessageEmbed = new MessageEmbed()
   
    embed.setTitle(issue.key)
    embed.setColor(this.randomColor())
    embed.setAuthor('Link JIRA','', `https://gazinlabs.atlassian.net/browse/${issue.key}`)
    embed.setDescription(issue.description)
    embed.setThumbnail(issue.thumbnail)
    embed.addFields(issue.fields)

    return embed
  }

}