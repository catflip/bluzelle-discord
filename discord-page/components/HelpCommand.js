import {
  DiscordEmbed,
  DiscordEmbedFields,
  DiscordEmbedField,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
export const HelpCommand=()=>{
    return ( <>
      <DiscordMessages>
        <DiscordMessage>/help</DiscordMessage>
        <DiscordMessage
          author="bluzelle"
          bot={true}
          avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
        >
          <DiscordEmbed
            color="#0099ff"
            slot="embeds"
            author-image="https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg"
            author-name="Bluzelle bot"
            author-url="https://bluzelle.com/"
          >
            A bot that is able to push updates to the Bluzelle Discord
            channel, reporting relevant statistics gathered from
            configured networks. it can report stats from bluzelle
            testnet and mainnet. Stats reported might include things
            like # of validators, # of blocks, block times, etc.
            <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="Command list">
                        list of command that can be used:
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="!deploy">
                      the first time you get this bot as an admin you must issue this command to deploy the slash command
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="!undeploy">
                      remove slash command from your guild/server
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/help">
                      to get list of command
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/total-validator">
                      total number of validator
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/total-block">
                      total number of block
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/block-times">
                      average block times
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/consensus-state">
                      get consensus state
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/latest-block">
                      get latest block
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/market-data">
                      get price of BLZ token
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/online-voting-power">
                      get online voting power
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/running">
                      get which command has been set to send periodically (ADMIN ONLY)
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/set [data] [time] [per]">
                      send data periodically (ADMIN ONLY)
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/stop [data]">
                      stop which command that has been set to send periodically (ADMIN ONLY)
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <DiscordEmbedFields slot="fields">
                      <DiscordEmbedField fieldTitle="/update [data] [time] [per]">
                      update which command that has been set to send periodically (ADMIN ONLY)
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
            <span slot="footer">Today at 9:42 PM</span>
          </DiscordEmbed>
          
        </DiscordMessage>
      </DiscordMessages>
    </>)
}