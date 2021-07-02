import * as dotenv from "dotenv";
// @ts-ignore
dotenv.config({ path: `${__dirname}/.env.local` });
import {
  Client,
  Message,
  MessageEmbed,
  ClientApplication,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} from "discord.js";
import {
  averageBlockTime,
  helpMessage,
  sendEmbed,
  totalBlocks,
  totalValidator
} from "./lib/interactions";
import { Api } from "./lib/api";

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const commandList = [
  {
    name: "help",
    description: "Get all of the command that you can send to discord bot",
  },
  {
    name: "total-validator",
    description: "total number of validator",
  },
  {
    name: "total-block",
    description: "total number of block",
  },
  {
    name: "block-times",
    description: "average block times",
  },
  {
    name: "set",
    description: "send data periodically to channel",
    options: [
      {
          "name": "data",
          "description": "the data that you want to send periodically to this channel",
          "type": 3,
          required: true,
          choices: [
            {
              name: 'total-validator',
              value: 'total-validator',
            },
            {
              name: 'total-blocks',
              value: 'total-blocks',
            },
            {
              name: 'block-times',
              value: 'block-times',
            }
          ],
      }
  ]
  },
  {
    name: "stop",
    description: "stop sending data periodically to channel",
  },
];
let periodic=new Map();
client.once("ready", async () => {
  console.log("Ready!");
  if (!client.application?.owner) {
    await client.application?.fetch();
    await client.guilds.cache
      .get(process.env.GUILD_ID as any)
      ?.commands.set([]);
    await client.guilds.cache
      .get(process.env.GUILD_ID as any)
      ?.commands.set(commandList);
  }
});
client.on("message", async (message: Message) => {
  if (!client.application?.owner) {
    await client.application?.fetch();
    await client.guilds.cache
      .get(process.env.GUILD_ID as any)
      ?.commands.set([]);
  }

  if (
    message.content.toLowerCase() === "!deploy" &&
    message.author.id === client.application?.owner?.id
  ) {
    const command = await client.guilds.cache
      .get(process.env.GUILD_ID as any)
      ?.commands.set(commandList);
  }
});
client.on("interaction", async (interaction) => {
  if (!interaction.isCommand()) return;

  const api = new Api();
  
  switch (interaction.commandName) {
   
    case "set":
      const dataPeriod=interaction.options.get("data").value
      // const dataSecond=interaction.options.get("second").value
      periodic.set(interaction.guildID,{channel_id:interaction.channelID,period:setInterval(async()=>sendEmbed(client,interaction.channelID,(await totalValidator(api))),5000)})
      await interaction.reply({ content:"s" });
      break;
    case "total-validator":
      await interaction.reply({ embeds: [(await totalValidator(api))] });
      break;
    case "total-block":
       await interaction.reply({ embeds: [(await totalBlocks(api))] });
      break;
      case "block-times":
      
      await interaction.reply({ embeds: [(await averageBlockTime(api))] });
      break;
    case "help":
      await interaction.reply({ embeds: [helpMessage.embed], components: [helpMessage.row] });
      break;
  }
});
client.login(process.env.DISCORD_TOKEN);
