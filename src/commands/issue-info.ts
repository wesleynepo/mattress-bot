import { Command } from './protocols'
import { Message } from 'discord.js'
import { AxiosResponse } from 'axios'
import { JiraHelper } from '../helper/jira-helper'
import { IssueLongJira } from '../helper/protocols/embed-issue'
import { EmbedHelper } from '../helper/embed-helper'

export class IssueInfoCommand implements Command {
  commandNames = ['task', 'issue'];

  async run(message: Message): Promise<void> {
    const issue = message.content.replace('>issue ', '')
    const task = await JiraHelper.getIssueInfo(issue)
    const issueData = createIssueFromResponse(task)
    await message.reply(EmbedHelper.formatIssueLong(issueData))
  }
}


const createIssueFromResponse = (task: AxiosResponse): IssueLongJira => {
  const data = task.data

  console.log(data)
  const issue: IssueLongJira = {
    key: data.key,
    description: data.fields.summary,
    thumbnail: data.fields.assignee?.avatarUrls['48x48'],
    fields:         [{name: 'Complexidade', value: data.fields.customfield_10026 || 'Indefinida' },
    {name: 'Sistema', value: data.fields.customfield_10084.value },
    {name: 'Tipo', value: data.fields.issuetype.name},
    {name: 'Sprint', value: data.fields?.customfield_10020 ? data.fields?.customfield_10020[0].name : 'Indefinida' },
    {name: 'Desenvolvedor', value: data.fields.assignee ? data.fields.assignee.displayName : 'Não definido' },
    {name: 'Revisor', value: data.fields.customfield_10088 ? data.fields.customfield_10088[0].displayName : 'Não revisado' },
    {name: 'Tester', value: data.fields.customfield_10104?.displayName || 'Não testado' } ]
  }

  return issue
}
