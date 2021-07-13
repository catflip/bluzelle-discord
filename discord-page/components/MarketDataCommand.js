import {
  DiscordEmbed,
  DiscordEmbedFields,
  DiscordEmbedField,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
export const MarketDataCommand=()=>{
    return (     <>
      <img src="https://i.gyazo.com/ac8ef28b789bd1a1ac9d2fe5eb9b3a7f.png" />
      <DiscordMessages>
        <DiscordMessage author={"User"}>
          /market-data
        </DiscordMessage>
        <DiscordMessage
          author="bluzelle"
          bot={true}
          avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
        >
          <DiscordEmbed
          title="Market Data"
            color="#0099ff"
            slot="embeds"
            author-image="https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg"
            author-name="Bluzelle bot"
            author-url="https://bluzelle.com/"
          >
            <DiscordEmbedFields slot="fields">
              <DiscordEmbedField fieldTitle="Price">
              $0.142615
              </DiscordEmbedField>
              <DiscordEmbedField fieldTitle="Market Cap">
              $42,271,803.92
              </DiscordEmbedField>
              
            </DiscordEmbedFields>
            <span slot="footer">Today at 9:42 PM</span>
          </DiscordEmbed>
        </DiscordMessage>
      </DiscordMessages>
    </>)
}