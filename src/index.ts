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
  helpMessageUser,
  helpMessageAdmin,
  consensusStateMessage,
} from "./lib/helpers";
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
          "description": "Get or edit permissions for a user",
          "type": 2 // 2 is type SUB_COMMAND_GROUP
      }
  ]
  },
  {
    name: "stop",
    description: "stop sending data periodically to channel",
  },
];
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
    case "total-validator":
      const totalValidator = await api.getValidator();
      const embedTotal = {
        color: 0x0099ff,
        title: "Bluzelle bot",
        url: "https://bluzelle.com/",
        thumbnail: {
          url: "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
        },
        fields: [
          {
            name: "Active Validators",
            value: `${
              totalValidator.filter(
                (val: any) =>
                  val.jailed === false && val.status === "BOND_STATUS_BONDED"
              ).length
            } out of ${totalValidator.length} validators`,
          },
        ],

        timestamp: new Date(),
      };
      await interaction.reply({ embeds: [embedTotal] });
      break;
    case "total-block":
      const totalBlock = await api.getLatestBlockHeight();
      const embedTotalBlock = {
        color: 0x0099ff,
        title: "Bluzelle bot",
        url: "https://bluzelle.com/",
        thumbnail: {
          url: "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
        },
        fields: [
          {
            name: "Latest Block Height",
            value: `${totalBlock}`,
          },
        ],

        timestamp: new Date(),
      };
      await interaction.reply({ embeds: [embedTotalBlock] });
      break;
      case "block-times":
      const blockTimes = await api.getAverageBlockTime();
      const embedBlockTimes = {
        color: 0x0099ff,
        title: "Bluzelle bot",
        url: "https://bluzelle.com/",
        thumbnail: {
          url: "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
        },
        fields: [
          {
            name: "Average Block Time (All)",
            value: `${blockTimes} second`,
          },
        ],

        timestamp: new Date(),
      };
      await interaction.reply({ embeds: [embedBlockTimes] });
      break;
    case "help":
      const embed = {
        color: 0x0099ff,
        title: "Bluzelle bot",
        url: "https://bluzelle.com/",
        description: `A bot that is able to push updates to the Bluzelle Discord channel, reporting relevant statistics gathered from configured networks.
    it can report stats from bluzelle testnet and mainnet. Stats reported might include things like # of validators, # of blocks, block times, etc.`,
        thumbnail: {
          url: "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
        },
        fields: [
          {
            name: "Command list",
            value: "list of command that can be used :",
          },
          {
            name: "!deploy",
            value:
              "the first time you get this bot as an admin you must issue this command to deploy the slash command",
          },
          {
            name: "/help",
            value: "to get list of command",
          },
          {
            name: "/total-validator",
            value: "total number of validator",
          },
          {
            name: "/total-block",
            value: "total number of block",
          },
          {
            name: "/block-times",
            value: "average block times",
          },
        ],

        timestamp: new Date(),
      };
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("INVITE")
          .setStyle("LINK")
          .setURL("https://google.com"),
        new MessageButton()
          .setLabel("COMMAND LIST")
          .setStyle("LINK")
          .setURL("https://google.com")
      );
      await interaction.reply({ embeds: [embed], components: [row] });
      break;
  }
});
client.login(process.env.DISCORD_TOKEN);
