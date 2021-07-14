
const dataOptions = {
  name: "data",
  description: "the data that you want to send periodically to this channel",
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
};
const perOptions = {
  name: "per",
  description: "how many times the data will be send",
  type: 4,
  required: true,
};
const timeOptions = {
  name: "time",
  description: "what time should the data be send",
  type: 3,
  required: true,
  choices: [
    {
      name: "second",
      value: "second",
    },
    {
      name: "minute",
      value: "minute",
    },
    {
      name: "hour",
      value: "hour",
    },
    {
      name: "day",
      value: "day",
    }
  ],
};
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
    options: [dataOptions,perOptions,timeOptions ],
  },
  {
    name: "update",
    description: "send data periodically to channel (ADMIN ONLY)",
    options: [dataOptions,perOptions,timeOptions ],
  },
  {
    name: "stop",
    description: "stop sending data periodically to a channel (ADMIN ONLY)",
    options: [dataOptions],
     
  },
];
