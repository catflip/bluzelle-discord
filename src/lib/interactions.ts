import {
  Client,
  CommandInteraction,
  MessageActionRow,
  MessageButton,
  TextChannel,
  EmbedFieldData,
} from "discord.js";
import * as numeral from "numeral";
import numbro from "numbro";
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
export async function latestBlockEmbed() {
  const api = new Api();

  const latestBlock = await api.getLatestBlock();
  if (latestBlock) {
    const embed = {
      color: 0x0099ff,
      author: {
        name: "Bluzelle bot",
        icon_url:
          "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
        url: "https://bluzelle.com/",
      },
      title: `Latest Block`,
      fields: [
        {
          name: "Time (UTC)",
          value: `${latestBlock.time}`,
        },
        {
          name: "#Hash",
          value: `${latestBlock.hash}`,
        },
        {
          name: "Proposer",
          value: `${latestBlock.proposer}`,
        },
        {
          name: "No. of Txs",
          value: `${latestBlock.transNum}`,
        },
        {
          name: "Height",
          value: `${latestBlock.height}`,
        },
      ],

      timestamp: new Date(),
    };
    return embed;
  } else {
    const embed = {
      color: 15158332,
      author: {
        name: "Bluzelle bot",
        icon_url:
          "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
        url: "https://bluzelle.com/",
      },
      description: "some error happen, please try again",
      timestamp: new Date(),
    };
    return embed;
  }
}
export function runningEmbed(
  periodList: Map<string, any>,
  interaction: CommandInteraction
) {
  const listRunning =
    periodList.size > 0 &&
    periodList.get(interaction.guildID as string).get(interaction.channelID)
      .size > 0
      ? periodList.get(interaction.guildID as string).get(interaction.channelID)
      : new Map();
  const fields: EmbedFieldData[] = Array.from(listRunning.keys()).map(
    (a): EmbedFieldData => ({
      name: (a as any).toString(),
      value: `stop with **/stop ${a}** and update with **/update ${a}**`,
    })
  );
  const embed = {
    color: 0x0099ff,
    author: {
      name: "Bluzelle bot",
      icon_url:
        "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      url: "https://bluzelle.com/",
    },
    description:
      listRunning.size > 0 ? undefined : "no data has been set in this channel",
    title: `Running`,
    fields,
    timestamp: new Date(),
  };
  return embed;
}
export async function marketDataEmbed() {
  const api = new Api();

  const marketData = await api.getCoinStats();
  const embed = {
    color: 0x0099ff,
    author: {
      name: "Bluzelle bot",
      icon_url:
        "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      url: "https://bluzelle.com/",
    },
    title: `Market Data`,
    fields: [
      {
        name: "Price",
        value: `$${marketData.usd}`,
      },
      {
        name: "Market Cap",
        // @ts-ignore
        value: `${numbro(marketData.usd_market_cap).format("$0,0.00")}`,
      },
    ],

    timestamp: new Date(),
  };
  return embed;
}
export async function validatorByAddressEmbed(address: string) {
  const api = new Api();

  const { validator: validatorInfo } = await api.getValidatorByAddress(address);

  const embed = {
    color: 0x0099ff,
    author: {
      name: "Bluzelle bot",
      icon_url:
        "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg",
      url: "https://bluzelle.com/",
    },
    title: `${validatorInfo.description.moniker} details`,
    fields: [
      {
        name: "Operator Address",
        value: `${validatorInfo.operator_address}`,
      },
      {
        name: "Self-Delegate Address",
        value: `[${api.getDelegator(validatorInfo.operator_address)}](${
          api.bigDipperUrl
        }/account/${api.getDelegator(validatorInfo.operator_address)})`,
      },
      {
        name: "Commission Rate",
        value: `${
          validatorInfo.commission && validatorInfo.commission.commission_rates
            ? numbro(
                validatorInfo.commission.commission_rates.rate * 100
              ).format("0.00") + "%"
            : ""
        }`,
      },
      {
        name: "Max Rate",
        value: `${
          validatorInfo.commission && validatorInfo.commission.commission_rates
            ? numbro(
                validatorInfo.commission.commission_rates.max_rate * 100
              ).format("0.00") + "%"
            : ""
        }`,
      },
      {
        name: "Max Change Rate",
        value: `${
          validatorInfo.commission && validatorInfo.commission.commission_rates
            ? numbro(
                validatorInfo.commission.commission_rates.max_change_rate * 100
              ).format("0.00") + "%"
            : ""
        }`,
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
        value: `${new Intl.NumberFormat("en-US").format(totalBlock.height)}
        ${totalBlock.time}`,
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
  const percentageAndTotalStake = await api.getPercentageAndTotalStake();
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
        value: `${numbro(onlineVotingPower).format("0,0.00a")}
        ${percentageAndTotalStake.percentage} from ${
          percentageAndTotalStake.totalStake
        }
        `,
      },
    ],

    timestamp: new Date(),
  };
  return embed;
}
export async function consensusStateEmbed() {
  const api = new Api();

  const { votingHeight, votingRound, votingStep, proposer, votedPower, image } =
    await api.getConsensusState();
  const embed = {
    color: 0x0099ff,
    title: "Consensus State",
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
    image: { url: image },
    timestamp: new Date(),
  };

  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomID(`getvalidator:${proposer.operator_address}`)
      .setLabel(`${proposer.description.moniker} details`)
      .setStyle("PRIMARY")
  );
  return { embed, row };
}
export const helpMessage = {
  embed: {
    color: 0x0099ff,
    description: `A bot that is able to push updates to the Bluzelle Discord channel, reporting relevant statistics gathered from configured networks.
it can report stats from bluzelle testnet only. Stats reported might include things like # of validators, # of blocks, block times, etc.`,
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
        name: "!undeploy",
        value: "remove slash command from your guild/server",
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
      {
        name: "/consensus-state",
        value: "get consensus state",
      },
      {
        name: "/latest-block",
        value: "get latest block",
      },
      {
        name: "/market-data",
        value: "get price of BLZ token",
      },
      {
        name: "/online-voting-power",
        value: "get online voting power",
      },
      {
        name: "/running",
        value:
          "get which command has been set to send periodically (ADMIN ONLY)",
      },
      {
        name: "/set [data] [time] [per]",
        value: "send data periodically (ADMIN ONLY)",
      },
      {
        name: "/stop [data]",
        value:
          "stop which command that has been set to send periodically (ADMIN ONLY)",
      },
      {
        name: "/update [data] [time] [per]",
        value:
          "update which command that has been set to send periodically (ADMIN ONLY)",
      },
    ],

    timestamp: new Date(),
  },
  row: new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("INVITE")
      .setStyle("LINK")
      .setURL(process.env.DISCORD_INVITE as string),
    new MessageButton()
      .setLabel("COMMAND LIST")
      .setStyle("LINK")
      .setURL(
        `${(process.env.WEBSITE as string) || "http://localhost:3000"}/commands`
      )
  ),
};

async function sendEmbed(client: Client, channelID: `${bigint}`, embed: any) {
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
      message = {
        embeds: [(await consensusStateEmbed()).embed],
        components: [(await consensusStateEmbed()).row],
      };
      break;
    case "online-voting-power":
      message = { embeds: [await onlineVotingPowerEmbed()] };
      break;
    case "latest-block":
      message = { embeds: [await latestBlockEmbed()] };
      break;
    case "market-data":
      message = { embeds: [await marketDataEmbed()] };
      break;
  }
  (client.channels.cache.get(channelID) as TextChannel).send(message);
}
function scheduling(
  client: Client,
  interaction: CommandInteraction,
  milisecond: number,
  embed: any
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
  time: number,
  per: string
) {
  let milisecond;

  switch (per) {
    case "daily":
      milisecond = time * 86400000;
      break;
    case "hour":
      milisecond = time * 3600000;
      break;
    case "minute":
      milisecond = time * 60000;
      break;
    case "second":
      milisecond = time * 1000;
      break;
  }
  if (
    periodList.has(interaction.guildID as string) &&
    periodList.get(interaction.guildID as string).has(interaction.channelID) &&
    periodList
      .get(interaction.guildID as string)
      .get(interaction.channelID)
      .has(dataSwitch)
  ) {
    return await interaction.reply({
      content: `${dataSwitch} has been set, please use **/update** to update the time`,
      ephemeral: true,
    });
  }
  if (!periodList.has(interaction.guildID as string))
    periodList.set(interaction.guildID as string, new Map());
  if (!periodList.get(interaction.guildID as string).has(interaction.channelID))
    periodList
      .get(interaction.guildID as string)
      .set(interaction.channelID, new Map());

  periodList
    .get(interaction.guildID as string)
    .get(interaction.channelID)
    .set(
      dataSwitch,
      scheduling(client, interaction, milisecond as any, dataSwitch)
    );

  await interaction.reply({
    content: `${dataSwitch} has been set, please use **/update** to update the time and **/stop** to stop the data`,
    ephemeral: true,
  });
}

export async function stopScheduling(
  periodList: Map<string, any>,
  interaction: CommandInteraction,
  dataSwitch: string | boolean | number
) {
  if (
    periodList.has(interaction.guildID as string) &&
    periodList
      .get(interaction.guildID as string)
      .get(interaction.channelID)
      .has(dataSwitch)
  ) {
    clearInterval(
      periodList
        .get(interaction.guildID as string)
        .get(interaction.channelID)
        .get(dataSwitch)
    );
    periodList
      .get(interaction.guildID as string)
      .get(interaction.channelID)
      .delete(dataSwitch);

    await interaction.reply({
      content: `${dataSwitch} has been stopped, please use **/set** to set it again`,
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: `${dataSwitch} is not set, set it using **/set** command`,
      ephemeral: true,
    });
  }
}

export async function updateScheduling(
  periodList: Map<string, any>,
  dataSwitch: string | number | boolean,
  client: Client,
  interaction: CommandInteraction,
  time: number,
  per: string
) {
  let milisecond;

  switch (per) {
    case "daily":
      milisecond = time * 86400000;
      break;
    case "hour":
      milisecond = time * 3600000;
      break;
    case "minute":
      milisecond = time * 60000;
      break;
    case "second":
      milisecond = time * 1000;
      break;
  }
  if (
    periodList.has(interaction.guildID as string) &&
    periodList
      .get(interaction.guildID as string)
      .get(interaction.channelID)
      .has(dataSwitch)
  ) {
    clearInterval(
      periodList
        .get(interaction.guildID as string)
        .get(interaction.channelID)
        .get(dataSwitch)
    );
    periodList
      .get(interaction.guildID as string)
      .get(interaction.channelID)
      .delete(dataSwitch);
    periodList
      .get(interaction.guildID as string)
      .get(interaction.channelID)
      .set(
        dataSwitch,
        scheduling(client, interaction, milisecond as any, dataSwitch)
      );
    await interaction.reply({
      content: `${dataSwitch} has been updated`,
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: `${dataSwitch} is not set, set it using **/set** command`,
      ephemeral: true,
    });
  }
}
