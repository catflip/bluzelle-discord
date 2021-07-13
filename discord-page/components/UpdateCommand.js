import { CardCommand } from "./CardCommand";
import {

  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
const description=<>
<p>To update what time the data that has been set should be sent</p>
<ol>
  <li>
    <b>- data [string]</b> set which data to send the data that can be send including <b>total-validator</b>,
     <b>total blocks</b>, <b>block-times</b> , <b>consensus-state</b>, <b>online-voting-power</b>, <b>latest-block</b> ,<b>market-data</b> 
  </li>
  <li>
    <b>- time [number]</b> how many times you want to send the data example 1,5,10
  </li>
  <li>
    <b>- per [string]</b> time period example second, minute, hour, daily
  </li>
</ol>
</>;
export const UpdateCommand=()=>{
    return (   <CardCommand
        anything={
          <DiscordMessages>
            <DiscordMessage author="admin">/update data:total-validator time:2 per:daily</DiscordMessage>
            <DiscordMessage
              author="bluzelle"
              bot={true}
              avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
            >
              total-validator has been set, please use <b>/update</b> to update the time and <b>/stop</b> to stop the data
            </DiscordMessage>
          </DiscordMessages>
        }
        title="/update data:[data] time:[time] per:[per]"
        description={description}
      />)
}