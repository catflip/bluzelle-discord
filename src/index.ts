import * as dotenv from "dotenv";
// @ts-ignore
dotenv.config({ path: `${__dirname}/.env.local` });
import { Client, Message, Permissions, TextChannel } from "discord.js";
import {
  averageBlockTime,
  consensusStateEmbed,
  helpMessage,
  latestBlockEmbed,
  marketDataEmbed,
  onlineVotingPowerEmbed,
  runningEmbed,
  setScheduling,
  stopScheduling,
  totalBlocks,
  totalValidator,
  updateScheduling,
  validatorByAddressEmbed,
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
    name: "online-voting-power",
    description: "get online voting power",
  },
  {
    name: "latest-block",
    description: "get latest block",
  },
  {
    name: "market-data",
    description: "get bluzelle coin market data",
  },
  {
    name: "running",
    description: "check which data is send periodically in this channel (ADMIN ONLY)",
  },
  {
    name: "set",
    description: "send data periodically to channel (ADMIN ONLY)",
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
          {
            name: "consensus-state",
            value: "consensus-state",
          },
          {
            name: "online-voting-power",
            value: "online-voting-power",
          },
          {
            name: "latest-block",
            value: "latest-block",
          },
          {
            name: "market-data",
            value: "market-data",
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
    name: "update",
    description: "send data periodically to channel (ADMIN ONLY)",
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
          {
            name: "consensus-state",
            value: "consensus-state",
          },
          {
            name: "online-voting-power",
            value: "online-voting-power",
          },
          {
            name: "latest-block",
            value: "latest-block",
          },
          {
            name: "market-data",
            value: "market-data",
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
    description: "stop sending data periodically to a channel (ADMIN ONLY)",
    options: [
      {
        name: "data",
        required:true,
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
          {
            name: "consensus-state",
            value: "consensus-state",
          },
          {
            name: "online-voting-power",
            value: "online-voting-power",
          },
          {
            name: "latest-block",
            value:     "latest-block",
          },
          {
            name: "market-data",
            value: "market-data",
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
  if (message.member.permissions.has("ADMINISTRATOR")) {
    await client.application?.fetch();
    // await client.guilds.cache
    //   .get(process.env.GUILD_ID as any)
    //   ?.commands.set([]);
  }

  if (
    message.content.toLowerCase() === "!deploy" &&
    message.member.permissions.has("ADMINISTRATOR")
  ) {
    await client.guilds.cache
      .get(process.env.GUILD_ID as any)
      ?.commands.set(commandList);
      (client.channels.cache.get(message.channel.id) as TextChannel).send("command has been deployed");
  }
});
client.on("interaction", async (interaction) => {
  
  if (interaction.isButton()) {
    switch (interaction.customID.split(":")[0]) {
      case "getvalidator":
        interaction.reply({
          embeds: [
            await validatorByAddressEmbed(interaction.customID.split(":")[1]),
          ],
        });
        break;
      default:
        interaction.reply({
          content: "can't find the command you looking for",
          ephemeral: true,
        });
        break;
    }
  
  }
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "stop":
      if(!(interaction.member.permissions as Permissions).has("ADMINISTRATOR")) return  await interaction.reply({content:"sorry you can't use this command only admin can use this command",ephemeral:true});
      const dataSwitchStop = interaction.options.get("data").value;
      stopScheduling(periodic, interaction, dataSwitchStop);
      break;
      case "update":
      if(!(interaction.member.permissions as Permissions).has("ADMINISTRATOR")) return await interaction.reply({content:"sorry you can't use this command only admin can use this command",ephemeral:true});
      const dataSwitchUpdate = interaction.options.get("data").value;
      const timeUpdate = interaction.options.get("time").value;
      updateScheduling(periodic, dataSwitchUpdate, client, interaction, timeUpdate.toString());
      break;
    case "set":
      if(!(interaction.member.permissions as Permissions).has("ADMINISTRATOR")) return await interaction.reply({content:"sorry you can't use this command only admin can use this command",ephemeral:true});
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
      await interaction.reply({
        embeds: [(await consensusStateEmbed()).embed],
        components: [(await consensusStateEmbed()).row],
      });
      break;
      case "online-voting-power":
      await interaction.reply({ embeds: [await onlineVotingPowerEmbed()] });
      break;
      case "latest-block":
        await interaction.reply({ embeds: [await latestBlockEmbed()] });
        break;
        case "market-data":
        await interaction.reply({ embeds: [await marketDataEmbed()] });
        break;
        case "running":
          if(!(interaction.member.permissions as Permissions).has("ADMINISTRATOR")) return  await interaction.reply({content:"sorry you can't use this command only admin can use this command",ephemeral:true});
          await interaction.reply({ embeds: [runningEmbed(periodic,interaction)] });
          break;
    case "help":
      await interaction.reply({
        embeds: [helpMessage.embed],
        components: [helpMessage.row],
      });
      break;
      default:
        interaction.reply({
          content: "can't find the command you looking for",
          ephemeral: true,
        });
        break;
  }
});
client.login(process.env.DISCORD_TOKEN);

  