import {
  DiscordEmbed,
  DiscordEmbedFields,
  DiscordEmbedField,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
export const OnlineVotingPowerCommand=()=>{
    return (     <>
      <img src="https://i.gyazo.com/6480eed5babdbae112d0c37381143bf3.png" />
      <DiscordMessages>
        <DiscordMessage author={"User"}>
          /online-voting-power
        </DiscordMessage>
        <DiscordMessage
          author="bluzelle"
          bot={true}
          avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
        >
          <DiscordEmbed
          title="Online Voting Power (Now)"
            color="#0099ff"
            slot="embeds"
            author-image="https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg"
            author-name="Bluzelle bot"
            author-url="https://bluzelle.com/"
          >
            <DiscordEmbedFields slot="fields">
              <DiscordEmbedField fieldTitle="Online Voting Power (Now)">
              9.38k

              </DiscordEmbedField>
              <DiscordEmbedField fieldTitle="">
              0.00% from 0.75b
              </DiscordEmbedField>
              
            </DiscordEmbedFields>
            <span slot="footer">Today at 9:42 PM</span>
          </DiscordEmbed>
        </DiscordMessage>
      </DiscordMessages>
    </>)
}