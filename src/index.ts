import * as dotenv from 'dotenv'
// @ts-ignore
dotenv.config({path:`${__dirname}/.env.local`})
import * as Discord from 'discord.js';
import { helpMessage } from './lib/helpers';
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', message => {
    const command=message.content.split(" ")
	switch(command[1]){
        case "--help":
            message.channel.send(`\`\`\`${helpMessage}\`\`\``);
        break;
    }
});
client.login(process.env.DISCORD_TOKEN);
