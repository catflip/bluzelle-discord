import {
  DiscordEmbed,
  DiscordEmbedFields,
  DiscordEmbedField,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
export const LatestBlockCommand=()=>{
    return (     <>
      <img src="https://i.gyazo.com/3f6165acdf2d2de6979d595c2646e1b4.png" />
      <DiscordMessages>
        <DiscordMessage author={"User"}>
          /latest-block
        </DiscordMessage>
        <DiscordMessage
          author="bluzelle"
          bot={true}
          avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
        >
          <DiscordEmbed
          title="Latest Block"
            color="#0099ff"
            slot="embeds"
            author-image="https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg"
            author-name="Bluzelle bot"
            author-url="https://bluzelle.com/"
          >
            <DiscordEmbedFields slot="fields">
              <DiscordEmbedField fieldTitle="Time (UTC)">
              13 Jul 2021, 2:57:58am UTC
              </DiscordEmbedField>
              <DiscordEmbedField fieldTitle="#Hash">
              F52C9493EFCBEB1AEE568D0FD00D549FC3D51999428F4A2D850057E24FD756D7
              </DiscordEmbedField>
              <DiscordEmbedField fieldTitle="Proposer">
              <a href="https://bigdipper.testnet.private.bluzelle.com/validator/bluzellevaloper1aum584mtkpk92qw7vmanw58vgjma5sasvwtvkd">daemon-validator-4</a>
              </DiscordEmbedField>
              <DiscordEmbedField fieldTitle="No. of Txs">
              0
              </DiscordEmbedField>
              <DiscordEmbedField fieldTitle="Height">
              <a href="https://bigdipper.testnet.private.bluzelle.com/blocks/298114">298142</a>
              </DiscordEmbedField>
            </DiscordEmbedFields>
            <span slot="footer">Today at 9:42 PM</span>
          </DiscordEmbed>
        </DiscordMessage>
      </DiscordMessages>
    </>)
}