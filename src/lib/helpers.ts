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
