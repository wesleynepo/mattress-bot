import axios, { AxiosResponse } from 'axios'

export const JiraHelper = {

  async getIssuesForReview(): Promise<AxiosResponse<any>> {
    return await axios.get(`https://gazinlabs.atlassian.net/rest/api/2/search?jql=status%20%3D%20%22Aguardando%20Revis%C3%A3o%22%20AND%20project%20%3D%20Ecommerce`, {
        'headers': { 'Authorization': `Basic ${process.env.JIRA_TOKEN}` },
      })
  },

  async getIssueInfo(issue: string): Promise<AxiosResponse<any>> {
    return await axios.get(`https://gazinlabs.atlassian.net/rest/api/3/issue/${issue}`, {
      'headers': { 'Authorization': `Basic ${process.env.JIRA_TOKEN}` }
  })
  }
}