/**
 *  Show help message for user in discord channel
 */
export const helpMessageUser:string=`
usage:
  @bluzellebot --url <url> <command> 

**description**:
  - url(optional): url to get bluzelle data, for example client.sentry.testnet.private.bluzelle.com, default to client.sentry.testnet.private.bluzelle.com

  **command list**:
  **--help**: to show help info
  **--consensus-state**: to see bluzelle network latest consensus state
  **--latest-block-height**: to see bluzelle network latest block height
  **--average-block-time**: to see bluzelle network average block time
  **--active-validators**: to see bluzelle network active validators
  **--online-voting-power**: to see bluzelle network online voting power
  **--latest-blocks**: to see bluzelle network latest blocks
  **--transactions**: to see bluzelle network latest transactions
  **--price**: to see bluzelle token latest price
  **--market-cap**: to see bluzelle token market cap
`;
/**
 *  Show help message for admin in discord channel
 */
export const helpMessageAdmin:string=`
**Admin Command**

**command to send data periodically**:
\`\`\`--set --data <data> --period <period>\`\`\`
description:
  - data: data to send to the discord channel separated by comma for example market-cap, price
  - period(optional): interval to send message to specified discord channel, default to second

**command to stop sending data periodically:**
  --stop: to stop sending data periodically

**data that can be send periodically**:
    - consensus-state: to see bluzelle network latest consensus state
    - latest-block-height: to see bluzelle network latest block height
    - average-block-time: to see bluzelle network average block time
    - active-validators: to see bluzelle network active validators
    - online-voting-power: to see bluzelle network online voting power
    - latest-blocks: to see bluzelle network latest blocks
    - transactions: to see bluzelle network latest transactions
    - price: to see bluzelle token latest price
    - market-cap: to see bluzelle token market cap

**period**:
    - hourly: to send data per hour
    - minutely: to send data per minute
    - secondly: to send data per second

**example to send data periodically**:
\`\`\`--set --data price,market-cap --period hourly\`\`\`  
`;
/**
 *  consensus state message
 */
export const consensusStateMessage=(height:number,round:number,step:number,proposer:string,voting_power:number):string=>{
  return `
  **Consensus State**

  **Height**: ${height}
  **Round**: ${round}
  **Step**: ${step}
  **Proposer**: ${proposer}
  **Voting Power**: ${voting_power}
  `
}

export const commandList = [
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
    description:
      "check which data is send periodically in this channel (ADMIN ONLY)",
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
        required: true,
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
            value: "latest-block",
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