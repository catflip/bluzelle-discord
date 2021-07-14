import { CardCommand } from "./CardCommand";
import {

  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
const description=<>
<p>To set which data to send</p>
<ol>
  <li>
    <b>- data [string]</b> set which data to send the data that can be send including <b>total-validator</b>,
     <b>total blocks</b>, <b>block-times</b> , <b>consensus-state</b>, <b>online-voting-power</b>, <b>latest-block</b> ,<b>market-data</b> 
  </li>
  <li>
    <b>- per [number]</b> time interval of how long the data should be send example 1,5,10
  </li>
  <li>
    <b>- time [string]</b> time period the options are <b>second</b>, <b>minute</b>, <b>hour</b>, <b>day</b>
  </li>
</ol>
</>;
export const SetCommand=()=>{
    return (   <CardCommand
        anything={
          <DiscordMessages>
            <DiscordMessage author="admin">/set data:total-validator time:2 per:day</DiscordMessage>
            <DiscordMessage
              author="bluzelle"
              bot={true}
              avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
            >
             total-validator has been set to send every 2 day, please use <b>/update</b> to update the time and <b>/stop</b> to stop the data
            </DiscordMessage>
          </DiscordMessages>
        }
        title="/set data:[data] time:[time] per:[per]"
        description={description}
      />)
}