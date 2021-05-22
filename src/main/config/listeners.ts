import { Client } from 'discord.js'
import messageListener from './listeners/command-listener'

export default (client:Client):void => {
  client.on('ready', () => { console.log('Discord bot started!') })
  client.on('error', e => { console.error('Discord client error!', e) })
  client.on('message', messageListener)
}