import { CardCommand } from "./CardCommand";
import {

  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
const description=<>
<p>To update what time the data should be sent</p>
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
export const UpdateCommand=()=>{
    return (   <CardCommand
        anything={
          <DiscordMessages>
            <DiscordMessage author="admin">/update data:total-validator per:2 time:minute</DiscordMessage>
            <DiscordMessage
              author="bluzelle"
              bot={true}
              avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
            >
              total-validator has been updated, to send every 2 minute
            </DiscordMessage>
          </DiscordMessages>
        }
        title="/update data:[data] per:[per] time:[time] "
        description={description}
      />)
}