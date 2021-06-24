/**
 *  Show help message in discord channel
 */
export const helpMessage:string=`
usage:
  @bluzellebot <command>

command list:
  --help: to show help info
  --consensus-state: to see bluzelle network latest consensus state
  --latest-block-height: to see bluzelle network latest block height
  --average-block-time: to see bluzelle network average block time
  --active-validators: to see bluzelle network active validators
  --online-voting-power: to see bluzelle network online voting power
  --latest-blocks: to see bluzelle network latest blocks
  --transactions: to see bluzelle network latest transactions
  --price: to see bluzelle token latest price
  --market-cap: to see bluzelle token market cap

command to send data periodically:
  --set --url <url> --data <data> --period <period>
  - url(optional): url to get bluzelle data, for example client.sentry.testnet.private.bluzelle.com, default to client.sentry.testnet.private.bluzelle.com
  - data: data to send to the discord channel separated by comma for example market-cap, price
  - period(optional): interval to send message to specified discord channel, default to second

command to stop sending data periodically:
  --stop

data that can be send periodically:
    - consensus-state: to see bluzelle network latest consensus state
    - latest-block-height: to see bluzelle network latest block height
    - average-block-time: to see bluzelle network average block time
    - active-validators: to see bluzelle network active validators
    - online-voting-power: to see bluzelle network online voting power
    - latest-blocks: to see bluzelle network latest blocks
    - transactions: to see bluzelle network latest transactions
    - price: to see bluzelle token latest price
    - market-cap: to see bluzelle token market cap

period:
    - hourly: to send data per hour
    - minutely: to send data per minute
    - secondly: to send data per second

example to send data periodically:
--set --data price,market-cap --period hourly


  
`;