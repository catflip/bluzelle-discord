import { CardCommand } from "./CardCommand";
import {

  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
const description=<>
<p>To stop the data that you send</p>
<ol>
  <li>
    <b>- data [string]</b> set which data to send the data that can be send including <b>total-validator</b>,
     <b>total blocks</b>, <b>block-times</b> , <b>consensus-state</b>, <b>online-voting-power</b>, <b>latest-block</b> ,<b>market-data</b> 
  </li>
 
</ol>
</>;
export const StopCommand=()=>{
    return (   <CardCommand
        anything={
          <DiscordMessages>
            <DiscordMessage author="admin">/stop data:total-validator </DiscordMessage>
            <DiscordMessage
              author="bluzelle"
              bot={true}
              avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
            >
             total-validator has been stopped, please use <b>/set</b> to set it again
            </DiscordMessage>
          </DiscordMessages>
        }
        title="/stop data:[data]"
        description={description}
      />)
}