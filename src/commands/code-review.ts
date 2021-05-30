import { Command } from './protocols'
import { Message } from 'discord.js'
import { JiraHelper } from '../helper/jira-helper'
import { EmbedHelper } from '../helper/embed-helper'
import { IssueShortJira } from '../helper/protocols/embed-issue'

export class CodeReviewCommand implements Command {
  commandNames = ['cr', 'codereview', 'revisar'];

  async run(message: Message): Promise<void> {
    const response = await JiraHelper.getIssuesForReview()
    const issues = response.data.issues

    issues.forEach((element: any) => {
      const issue: IssueShortJira = {
        key: element.key,
        description: element.fields.summary
      }
        message.reply(EmbedHelper.formatIssueShort(issue))
      })
  } 
}
