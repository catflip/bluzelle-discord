import { Client, CommandInteraction, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import * as schedule from 'node-schedule'
import { Api } from "./api";
export async function totalValidator(){
  const api = new Api();
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

export async function totalBlocks() {
  const api = new Api();
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
export async function averageBlockTime() {
  const api = new Api();
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
  console.log("sed");
  (client.channels.cache.get(channelID) as TextChannel).send({embeds:[(await totalBlocks())]})  
}
function scheduling(client:Client,interaction:CommandInteraction,milisecond:number,embed){
  const setIntervalAsync = (fn, ms) => {
    fn().then(() => {
      setTimeout(() => setIntervalAsync(fn, ms), ms);
    });
  };
  return setIntervalAsync(() => sendEmbed(client,interaction.channelID,embed), 3000);
  
  
}

export async function setScheduling(periodList:Map<string,any>,dataSwitch:string|number|boolean,client:Client,interaction:CommandInteraction,time:string){
  let milisecond;
  
  
  switch(time){
    case "daily":
      milisecond = "0 0 * * *";
      break;
      case "hourly":
        milisecond = "0 * * * *";
      break;
      case "minutely":
      milisecond="* * * * *";
      break;
      case "secondly":
        milisecond="*/5 * * * * *";
        break;
  }
 
  
  
switch(dataSwitch){
  case "total-validator":
    if(periodList.has(interaction.guildID) && periodList.get(interaction.guildID).has(interaction.channelID)) return await interaction.reply({ content: `${dataSwitch} has been set, please use /update to update the time` });
    const channelTotalValidator=new Map();
    channelTotalValidator.set(interaction.channelID,scheduling(client,interaction,milisecond,{embeds:[(await totalValidator())]}))
    periodList.set(interaction.guildID,channelTotalValidator)
    await interaction.reply({ content: `${dataSwitch} has been set, please use /update to update the time and /stop to stop the data` });
    break;
    case "total-blocks":
    if(periodList.has(interaction.guildID) && periodList.get(interaction.guildID).has(interaction.channelID)) return await interaction.reply({ content: "${dataSwitch} has been set, please use /update to update the time" });
    const channelTotalBlocks=new Map();
    channelTotalBlocks.set(interaction.channelID,scheduling(client,interaction,milisecond,{embeds:[(await totalBlocks())]}))
    periodList.set(interaction.guildID,channelTotalBlocks)
    await interaction.reply({ content: `${dataSwitch} has been set, please use /update to update the time and /stop to stop the data` });
    break;
    case "block-times":
    if(periodList.has(interaction.guildID) && periodList.get(interaction.guildID).has(interaction.channelID)) return await interaction.reply({ content: "${dataSwitch} has been set, please use /update to update the time" });
    const channelBlockTimes=new Map();
    channelBlockTimes.set(interaction.channelID,scheduling(client,interaction,milisecond,{embeds:[(await totalBlocks())]}))
    periodList.set(interaction.guildID,channelBlockTimes)
    await interaction.reply({ content: `${dataSwitch} has been set, please use /update to update the time and /stop to stop the data` });
    break;
}
}