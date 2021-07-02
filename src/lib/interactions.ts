import { Client, CommandInteraction, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { captureRejectionSymbol } from "events";
import { Api } from "./api";
export async function totalValidator(api:Api){
    const totalValidator = await api.getValidator();
    const embed = {
      color: 0x0099ff,
      author: {
        name: 'Bluzelle bot',
        icon_url: 'https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg',
        url: 'https://bluzelle.com/',
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
    return embed

}

export async function totalBlocks(api:Api) {
    const totalBlock = await api.getLatestBlockHeight();
    const embed = {
      color: 0x0099ff,
      author: {
        name: 'Bluzelle bot',
        icon_url: 'https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg',
        url: 'https://bluzelle.com/',
      },
      fields: [
        {
          name: "Latest Block Height",
          value: `${totalBlock}`,
        },
      ],

      timestamp: new Date(),
    };
    return embed
}
export async function averageBlockTime(api:Api) {
  const blockTimes = await api.getAverageBlockTime();
      const embed = {
        color: 0x0099ff,
        author: {
          name: 'Bluzelle bot',
          icon_url: 'https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg',
          url: 'https://bluzelle.com/',
        },
        fields: [
          {
            name: "Average Block Time (All)",
            value: `${blockTimes} second`,
          },
        ],

        timestamp: new Date(),
      };
      return embed;
  
}

export const helpMessage={
  embed :{
    color: 0x0099ff,
      description: `A bot that is able to push updates to the Bluzelle Discord channel, reporting relevant statistics gathered from configured networks.
it can report stats from bluzelle testnet and mainnet. Stats reported might include things like # of validators, # of blocks, block times, etc.`,
    author: {
      name: 'Bluzelle bot',
      icon_url: 'https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg',
      url: 'https://bluzelle.com/',
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
  },
  row : new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("INVITE")
      .setStyle("LINK")
      .setURL("https://google.com"),
    new MessageButton()
      .setLabel("COMMAND LIST")
      .setStyle("LINK")
      .setURL("https://google.com")
  )
  
}

async function sendEmbed(client:Client,channelID:`${bigint}`,embed){
  (client.channels.cache.get(channelID) as TextChannel).send(embed)  
}
function scheduling(client:Client,interaction:CommandInteraction,api:Api,milisecond:number,embed){
  return setInterval(async()=>sendEmbed(client,interaction.channelID,embed),milisecond)
}

export function setScheduling(periodList:Map<string,any>,dataSwitch:string|number|boolean){
switch(dataSwitch){
  case "total-validator":
    break;
    case "total-blocks":
    break;
    case "block-times":
    break;
}
}