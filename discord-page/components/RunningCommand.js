import { CardCommand } from "./CardCommand";
import {
DiscordEmbed,
DiscordEmbedField,
DiscordEmbedFields,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
export const RunningCommand=()=>{
    return (   <CardCommand
        anything={
          <DiscordMessages>
            <DiscordMessage author="admin">/running</DiscordMessage>
            <DiscordMessage
              author="bluzelle"
              bot={true}
              avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
            >
                <DiscordEmbed
                title="Running process"
            color="#0099ff"
            slot="embeds"
            author-image="https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg"
            author-name="Bluzelle bot"
            author-url="https://bluzelle.com/"
          >
            <DiscordEmbedFields slot="fields">
              <DiscordEmbedField fieldTitle="total-validator">
              stop with  <b>/stop data:total-validator</b> and update with <b>/update data:total-validator</b>
              </DiscordEmbedField>
              <DiscordEmbedField fieldTitle="total-blocks">
              stop with  <b>/stop data:total-blocks</b> and update with <b>/update data:total-blocks</b>
              </DiscordEmbedField>
            </DiscordEmbedFields>
            <span slot="footer">Today at 9:42 PM</span>
          </DiscordEmbed>
            </DiscordMessage>
          </DiscordMessages>
        }
        title="/running (ADMIN ONLY)"
        description="to see which data has been set to send periodically to this channel"
      />)
}