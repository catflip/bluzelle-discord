import * as dotenv from "dotenv";
// @ts-ignore
dotenv.config({ path: `${__dirname}/.env.local` });
import { Client, Message } from "discord.js";
import {
  averageBlockTime,
  consensusStateEmbed,
  helpMessage,
  setScheduling,
  stopScheduling,
  totalBlocks,
  totalValidator,
} from "./lib/interactions";


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
    name: "consensus-state",
    description: "get consensus state",
  },
  {
    name: "set",
    description: "send data periodically to channel",
    options: [
      {
        name: "data",
        description:
          "the data that you want to send periodically to this channel",
        type: 3,
        required: true,
        choices: [
          {
            name: "total-validator",
            value: "total-validator",
          },
          {
            name: "total-blocks",
            value: "total-blocks",
          },
          {
            name: "block-times",
            value: "block-times",
          },
        ],
      },
      {
        name: "time",
        description: "what time should the data be sent",
        type: 3,
        required: true,
        choices: [
          {
            name: "daily",
            value: "daily",
          },
          {
            name: "hourly",
            value: "hourly",
          },
          {
            name: "minutely",
            value: "minutely",
          },
          {
            name: "secondly",
            value: "secondly",
          },
        ],
      },
    ],
  },
  {
    name: "stop",
    description: "stop sending data periodically to a channel",
    options: [
      {
        name: "data",
        description:
          "the data that you want to send periodically to this channel",
        type: 3,
        choices: [
          {
            name: "total-validator",
            value: "total-validator",
          },
          {
            name: "total-blocks",
            value: "total-blocks",
          },
          {
            name: "block-times",
            value: "block-times",
          },
        ],
      },
    ],
  },
];
let periodic = new Map();
client.once("ready", async () => {
  console.log("Ready!");
  // if (!client.application?.owner) {
  //   await client.application?.fetch();
  //   await client.guilds.cache
  //     .get(process.env.GUILD_ID as any)
  //     ?.commands.set([]);
  //   await client.guilds.cache
  //     .get(process.env.GUILD_ID as any)
  //     ?.commands.set(commandList);
  // }
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

  switch (interaction.commandName) {
    case "stop":
      
      const dataSwitchStop = interaction.options.get("data").value;
      stopScheduling(periodic, interaction, dataSwitchStop);
      break;
    case "set":
      const dataSwitch = interaction.options.get("data").value;
      const time = interaction.options.get("time").value;
      setScheduling(periodic, dataSwitch, client, interaction, time.toString());

      break;
    case "total-validator":
      await interaction.reply({ embeds: [await totalValidator()] });
      break;
    case "total-block":
      await interaction.reply({ embeds: [await totalBlocks()] });
      break;
    case "block-times":
      await interaction.reply({ embeds: [await averageBlockTime()] });
      break;
      case "consensus-state":
        await interaction.reply({ embeds: [await consensusStateEmbed()] });
        break;
    case "help":
      await interaction.reply({
        embeds: [helpMessage.embed],
        components: [helpMessage.row],
      });
      break;
  }
});
client.login(process.env.DISCORD_TOKEN);
