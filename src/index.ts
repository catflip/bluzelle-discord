import * as dotenv from "dotenv";
// @ts-ignore
dotenv.config({ path: `${__dirname}/.env.local` });
import { Client, Message,MessageEmbed,ClientApplication, MessageActionRow,MessageButton, MessageSelectMenu } from "discord.js";
import { helpMessageUser, helpMessageAdmin,consensusStateMessage } from "./lib/helpers";
import { Api } from "./lib/api";

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES']});

client.once("ready", async () => {
  console.log("Ready!");
  
  // const wok = new WOKCommands(client, {
  //   // The name of the local folder for your command files
  //   commandsDir: "commands",
  //   testServers: [process.env.GUILD_ID],
  // });
  // const Guilds = client.guilds.cache.find(guild => guild.id==="603514468915216415");
  // const { slashCommands } = wok;
  // await slashCommands.get("603514468915216415")
  // await slashCommands.delete("858949390042267678","603514468915216415")
  // await slashCommands.delete("858875578384121876")
  
});
client.on("message", async (message: Message) => {
  console.log("s")
  // const a=await (await client.application?.commands.fetch()).size
  // console.log(a)
  // const command = ;
  // console.log(command);
  // console.log(client.application)
  if (!client.application?.owner) {
    await client.application?.fetch();
    await client.guilds.cache.get((process.env.GUILD_ID as any))?.commands.set([])
  }

	if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner?.id) {
    
		const data = {
			name: 'help',
			description: 'Get all of the command that you can send to discord bot',
    };

		const command = await client.guilds.cache.get((process.env.GUILD_ID as any))?.commands.create(data);
	
	}
  // const command: Array<string> = message.content.split(" ");
  // const api = new Api();
  if (message.author.id === "798053928989098014") return;
  // switch (command[1]) {
  //   case "--help":
  //     message.channel.send(helpMessageUser);
  //     if (message.member.hasPermission("ADMINISTRATOR"))
  //       message.channel.send(helpMessageAdmin);
  //     break;
  //   case "--consensus-state":
  //     const consensusState = await api.getConsensusState();
  //     message.channel.send(JSON.stringify(consensusState));
  //     break;
  //     case "--proposer":
  //       const proposer = await api.getMoniker();
  //       message.channel.send(JSON.stringify(proposer));
  //       break;
  // }
});
client.on('interaction', async interaction => {
  console.log("S")
	if (!interaction.isCommand()) return;
  if (interaction.user.id === "798053928989098014") return;
switch(interaction.commandName){
case "help":
  const embed = {
    color: 0x0099ff,
    title: 'Bluzelle bot',
    url: 'https://bluzelle.com/',
    description: `A bot that is able to push updates to the Bluzelle Discord channel, reporting relevant statistics gathered from configured networks.
    it can report stats from bluzelle testnet and mainnet. Stats reported might include things like # of validators, # of blocks, block times, etc.`,
    thumbnail: {
      url: 'https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg',
    },
    fields: [
      {
        name: 'Command list',
        value: 'list of command that can be used :',
      },
      {
        name: '!deploy',
        value: 'the first time you get this bot as an admin you must issue this command to deploy the slash command',
      },
      {
        name: '/help',
        value: 'to get list of command',
      },
      {
        name: '/total-validator',
        value: 'total number of validator',
      },
      {
        name: '/total-block',
        value: 'total number of block',
      },
      {
        name: '/block-times',
        value: 'average block times',
      },
    ],

    timestamp: new Date(),
   
  };

		await interaction.reply({embeds:[embed]});
  break;
}
	
});
client.login(process.env.DISCORD_TOKEN);
