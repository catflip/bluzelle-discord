import * as dotenv from 'dotenv'
// @ts-ignore
dotenv.config({path:`${__dirname}/.env.local`})
import {Client,Message} from 'discord.js';
import { helpMessageUser,helpMessageAdmin } from './lib/helpers';
const client = new Client();

client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', (message:Message) => {
    const command:Array<string>=message.content.split(" ")
    
    if(message.author.id==="798053928989098014") return;
	switch(command[1]){
        case "--help":
            message.channel.send(helpMessageUser);
            if(message.member.hasPermission('ADMINISTRATOR')) message.channel.send(helpMessageAdmin);
        break;
        case "--consensus-state":
            message.channel.send(helpMessageUser);
            if(message.member.hasPermission('ADMINISTRATOR')) message.channel.send(helpMessageAdmin);
        break;
    }
});
client.login(process.env.DISCORD_TOKEN);
