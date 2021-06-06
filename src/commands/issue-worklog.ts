import { Command } from './protocols'
import { Message } from 'discord.js'
import { MongoHelper } from '../helper/mongo-helper'
import axios from 'axios'

export class IssueWorklogCommand implements Command {
  commandNames = ['worklog']

  async run(message: Message): Promise<void> {
    const id = message.author.id
    const messageArray = message.content.split(' ')

    const issue = messageArray[1]
    const timeSpent = messageArray[2]
    const date = messageArray[3].split('/').map(value => parseInt(value))

    const content = {
      timeSpent: timeSpent.replace(/(\D)/g,'$1 '),
      started: new Date(date[2],date[1] - 1 ,date[0], 12).toISOString().replace(/\..*/,'.000-0000')
    }

    const discordUserCollection = await MongoHelper.getCollection('discordUser')
    const user = await discordUserCollection.findOne({ userId: id })

    if(!user) {
      message.reply('Você deve configurar seu Token do Jira. Mande uma mensagem no privado para mim! Com >jira')
    }     

    axios.post(`https://gazinlabs.atlassian.net/rest/api/3/issue/${issue}/worklog`, content, {
      'headers': { 'Authorization': `Basic ${user.JiraToken}` }}).catch(error => console.log(error))

    message.reply(`Worklog to ${messageArray[3]} with time ${timeSpent}`)
  } 
}
 