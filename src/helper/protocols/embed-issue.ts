import { EmbedFieldData } from 'discord.js'

export interface IssueShortJira {
  key: string
  description: string
}

export interface IssueLongJira extends IssueShortJira{
  thumbnail: string 
  fields: EmbedFieldData[]
}

