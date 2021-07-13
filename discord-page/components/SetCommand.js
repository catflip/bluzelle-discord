import { CardCommand } from "./CardCommand";
import {

  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
export const SetCommand=()=>{
    return (   <CardCommand
        anything={
          <DiscordMessages>
            <DiscordMessage author="admin">/set data:[data] time:[time] per:[per]</DiscordMessage>
            <DiscordMessage
              author="bluzelle"
              bot={true}
              avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
            >
              command has been deployed
            </DiscordMessage>
          </DiscordMessages>
        }
        title="!undeploy (ADMIN ONLY)"
        description="command has been undeployed"
      />)
}