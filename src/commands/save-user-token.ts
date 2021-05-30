import { Command } from './protocols'
import { Message } from 'discord.js'
import { MongoHelper } from '../helper/mongo-helper'

export class SaveUserTokenCommand implements Command {
  commandNames = ['save']

  async run(message: Message): Promise<void> {
    const id = message.author.id
    const token = message.content.split(' ')?.[1]

    if(!token.includes(':')) {
      message.reply('Token deve ser <email>:<token>')
      return
    }

    const discordUserCollection = await MongoHelper.getCollection('discordUser')
    await discordUserCollection.findOneAndUpdate({ userId: id }, { $set: {tokenJira: token}}, {upsert: true})

    message.reply('Salvo!')
  } 
}
