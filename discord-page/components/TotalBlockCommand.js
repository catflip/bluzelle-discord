import {
  DiscordEmbed,
  DiscordEmbedFields,
  DiscordEmbedField,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
export const TotalBlockCommand=()=>{
    return (     <>
      <img src="https://i.gyazo.com/2763b0ee1e08a851d79b9a66f79511bf.png" />
      <DiscordMessages>
        <DiscordMessage author={"User"}>
          /total-block
        </DiscordMessage>
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
            <DiscordEmbedFields slot="fields">
              <DiscordEmbedField fieldTitle="Latest Block Height">
              258,680
              </DiscordEmbedField>
              <DiscordEmbedField fieldTitle="">
              13 Jul 2021, 2:03:56am UTC
              </DiscordEmbedField>
            </DiscordEmbedFields>
            <span slot="footer">Today at 9:42 PM</span>
          </DiscordEmbed>
        </DiscordMessage>
      </DiscordMessages>
    </>)
}