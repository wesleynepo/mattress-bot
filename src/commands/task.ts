import Command from './commandInterface'
import { Message, MessageEmbed } from 'discord.js'
import axios, { AxiosResponse } from 'axios'

export class TaskCommand implements Command {
  commandNames = ['task', 'issue'];

  help(commandPrefix: string): string {
    return `Use ${commandPrefix}to receive the task info.`
  }

  async run(message: Message): Promise<void> {
    const issueID = message.content.replace('>issue ', '')
    const task = await axios.get(`https://gazinlabs.atlassian.net/rest/api/3/issue/${issueID}`, {
        'headers': { 'Authorization': `Basic ${process.env.JIRA_TOKEN}` }
    })

    await message.reply(createEmbedFromResponse(task))
  }
}


const createEmbedFromResponse = (task: AxiosResponse): MessageEmbed => {
    const data = task.data
    const embed: MessageEmbed = new MessageEmbed()
    const randomColor = Math.floor(Math.random()*16777215).toString(16)
    
    embed.setTitle(data.key)
    embed.setColor(randomColor)
    embed.setAuthor('Link JIRA','', `https://gazinlabs.atlassian.net/browse/${data.key}`)
    embed.setDescription(data.fields.summary)
    embed.setThumbnail(data.fields.assignee.avatarUrls['48x48'])
    embed.addFields(
        {name: 'Complexidade', value: data.fields.customfield_10026 || 'Indefinida' },
        {name: 'Sistema', value: data.fields.customfield_10084.value },
        {name: 'Tipo', value: data.fields.issuetype.name},
        {name: 'Sprint', value: data.fields.customfield_10020[0]?.name || 'Indefinida' },
        {name: 'Desenvolvedor', value: data.fields.assignee.displayName || 'Não definido' },
        {name: 'Revisor', value: data.fields.customfield_10088[0]?.displayName || 'Não revisado' },
        {name: 'Tester', value: data.fields.customfield_10104?.displayName || 'Não testado' }

    )
    
    return embed
}
