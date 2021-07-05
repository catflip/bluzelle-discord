import {
  Client,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  TextChannel,
} from "discord.js";
import * as numeral from "numeral"
import { Api } from "./api";
export async function totalValidator() {
  const api = new Api();
  const totalValidator = await api.getValidator();
  const embed = {
    color: 0x0099ff,
    author: {
      name: "Bluzelle bot",
      icon_url:
        "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      url: "https://bluzelle.com/",
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
  return embed;
}

export async function validatorByAddressEmbed(address:string) {

  const api = new Api();
  const {validator:validatorInfo} = await api.getValidatorByAddress(address);
  
  const embed = {
    color: 0x0099ff,
    author: {
      name: "Bluzelle bot",
      icon_url:
        "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      url: "https://bluzelle.com/",
    },
    title:`${validatorInfo.description.moniker} details`,
    fields: [
      {
        name: "Operator Address",
        value: `${validatorInfo.operator_address}`,
      },
      {
        name: "Self-Delegate Address",
        value: `[${api.getDelegator(validatorInfo.operator_address)}](${api.bigDipperUrl}/account/${api.getDelegator(validatorInfo.operator_address)})`,
      },
      {
        name: "Commission Rate",
        value: `${validatorInfo.commission&&validatorInfo.commission.commission_rates?numeral(validatorInfo.commission.commission_rates.rate*100).format('0.00')+"%":''}`,
      },
      {
        name: "Max Rate",
        value: `${validatorInfo.commission&&validatorInfo.commission.commission_rates?numeral(validatorInfo.commission.commission_rates.max_rate*100).format('0.00')+"%":''}`,
      },
      {
        name: "Max Change Rate",
        value: `${validatorInfo.commission&&validatorInfo.commission.commission_rates?numeral(validatorInfo.commission.commission_rates.max_change_rate*100).format('0.00')+"%":''}`,
      },
    ],

    timestamp: new Date(),
  };
  return embed;
}
export async function totalBlocks() {
  const api = new Api();
  const totalBlock = await api.getLatestBlockHeight();
  const embed = {
    color: 0x0099ff,
    author: {
      name: "Bluzelle bot",
      icon_url:
        "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      url: "https://bluzelle.com/",
    },
    fields: [
      {
        name: "Latest Block Height",
        value: `${totalBlock}`,
      },
    ],

    timestamp: new Date(),
  };
  return embed;
}
export async function averageBlockTime() {
  const api = new Api();
  const blockTimes = await api.getAverageBlockTime();
  const embed = {
    color: 0x0099ff,
    author: {
      name: "Bluzelle bot",
      icon_url:
        "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      url: "https://bluzelle.com/",
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
export async function onlineVotingPowerEmbed() {
  const api = new Api();
  const onlineVotingPower = await api.getOnlineVotingPower();
  const embed = {
    color: 0x0099ff,
    author: {
      name: "Bluzelle bot",
      icon_url:
        "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      url: "https://bluzelle.com/",
    },
    fields: [
      {
        name: "Online Voting Power (Now)",
        value: `${numeral(onlineVotingPower).format('0,0.00a')}
        0.00% from 0.75b
        `,
      },
    ],

    timestamp: new Date(),
  };
  return embed;
}
export async function consensusStateEmbed() {
  const api = new Api();
  const {votingHeight,votingRound,votingStep,proposer,votedPower} = await api.getConsensusState();
  const embed = {
    color: 0x0099ff,
    title:"Consensus State",
    author: {
      name: "Bluzelle bot",
      icon_url:
        "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      url: "https://bluzelle.com/",
    },
    fields: [
      {
        name: "Height",
        value: `${votingHeight}`,
        
      },
      {
        name: "Round",
        value: `${votingRound}`,
        
      },
      {
        name: "Step",
        value: `${votingStep}`,
        
      },
      {
        name: "Proposer",
        value: `[${proposer.description.moniker}](${api.bigDipperUrl}/validator/${proposer.operator_address})`,
        
      },
      {
        name: "Voting Power",
        value: `${votedPower}`,
        
      },
    ],

    timestamp: new Date(),
  };
  
  const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomID(`getvalidator:${proposer.operator_address}`)
					.setLabel(`${proposer.description.moniker} details`)
					.setStyle('PRIMARY'),
        
			);
  return {embed,row};
}
export const helpMessage = {
  embed: {
    color: 0x0099ff,
    description: `A bot that is able to push updates to the Bluzelle Discord channel, reporting relevant statistics gathered from configured networks.
it can report stats from bluzelle testnet and mainnet. Stats reported might include things like # of validators, # of blocks, block times, etc.`,
    author: {
      name: "Bluzelle bot",
      icon_url:
        "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      url: "https://bluzelle.com/",
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
  row: new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("INVITE")
      .setStyle("LINK")
      .setURL("https://google.com"),
    new MessageButton()
      .setLabel("COMMAND LIST")
      .setStyle("LINK")
      .setURL("https://google.com")
  ),
};

async function sendEmbed(client: Client, channelID: `${bigint}`, embed) {
  let message: any = "sorry can't process message";
  switch (embed) {
    case "total-validator":
      message = { embeds: [await totalValidator()] };
      break;
    case "total-blocks":
      message = { embeds: [await totalBlocks()] };
      break;
    case "block-times":
      message = { embeds: [await averageBlockTime()] };
      break;
    case "consensus-state":
      message = { embeds: [(await consensusStateEmbed()).embed],components:[(await consensusStateEmbed()).row] };
      break;
  }
  (client.channels.cache.get(channelID) as TextChannel).send(message);
}
function scheduling(
  client: Client,
  interaction: CommandInteraction,
  milisecond: number,
  embed
) {
  return setInterval(
    () => sendEmbed(client, interaction.channelID, embed),
    milisecond
  );
}

export async function setScheduling(
  periodList: Map<string, any>,
  dataSwitch: string | number | boolean,
  client: Client,
  interaction: CommandInteraction,
  time: string
) {
  let milisecond;

  switch (time) {
    case "daily":
      milisecond = 86400000;
      break;
    case "hourly":
      milisecond = 3600000;
      break;
    case "minutely":
      milisecond = 60000;
      break;
    case "secondly":
      milisecond = 5000;
      break;
  }
  if (
    periodList.has(interaction.guildID) &&
    periodList
      .get(interaction.guildID)
      .has(`${interaction.channelID}:${dataSwitch}`)
  ) {
    return await interaction.reply({
      content: `${dataSwitch} has been set, please use /update to update the time`,
    });
  }
  if (!periodList.has(interaction.guildID))
    periodList.set(interaction.guildID, new Map());
  periodList
    .get(interaction.guildID)
    .set(
      `${interaction.channelID}:${dataSwitch}`,
      scheduling(client, interaction, milisecond, dataSwitch)
    );

  await interaction.reply({
    content: `${dataSwitch} has been set, please use /update to update the time and /stop to stop the data`,
  });
}

export async function stopScheduling(
  periodList: Map<string, any>,
  interaction: CommandInteraction,
  dataSwitch: string | boolean | number
) {
  if (
    periodList.has(interaction.guildID) &&
    periodList
      .get(interaction.guildID)
      .has(`${interaction.channelID}:${dataSwitch}`)
  ) {
    clearInterval(
      periodList
        .get(interaction.guildID)
        .get(`${interaction.channelID}:${dataSwitch}`)
    );
    periodList
      .get(interaction.guildID)
      .delete(`${interaction.channelID}:${dataSwitch}`);
    await interaction.reply({
      content: `${dataSwitch} has been stopped, please use /set to set it again`,
    });
  } else {
    console.log(periodList);
    await interaction.reply({
      content: `${dataSwitch} is not set, set it using /set command`,
    });
  }
}
