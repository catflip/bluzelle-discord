import {
  DiscordEmbed,
  DiscordEmbedFields,
  DiscordEmbedField,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
export const ConsensusStateCommand=()=>{
    return (    <>
      <img src="https://i.gyazo.com/eeaf54f405fc3665e9fb060a97cca2f9.png" />
      <DiscordMessages>
        <DiscordMessage author={"User"}>
          /consensus-state
        </DiscordMessage>
        <DiscordMessage
          author="bluzelle"
          bot={true}
          avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
        >
          <DiscordEmbed
          title="Consensus State"
            color="#0099ff"
            slot="embeds"
            author-image="https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg"
            author-name="Bluzelle bot"
            author-url="https://bluzelle.com/"
          >
            <DiscordEmbedFields slot="fields">
              <DiscordEmbedField fieldTitle="Height">
              298056
              </DiscordEmbedField>
            </DiscordEmbedFields>
            <DiscordEmbedFields slot="fields">
              <DiscordEmbedField fieldTitle="Round">
              0
              </DiscordEmbedField>
            </DiscordEmbedFields>
            <DiscordEmbedFields slot="fields">
              <DiscordEmbedField fieldTitle="Step">
              1
              </DiscordEmbedField>
            </DiscordEmbedFields>
            <DiscordEmbedFields slot="fields">
              <DiscordEmbedField fieldTitle="Proposer">
              <a href="https://bigdipper.testnet.private.bluzelle.com/validator/bluzellevaloper1aum584mtkpk92qw7vmanw58vgjma5sasvwtvkd">daemon-validator-4</a>
              </DiscordEmbedField>
            </DiscordEmbedFields>
            <DiscordEmbedFields slot="fields">
              <DiscordEmbedField fieldTitle="Voting Power">
              0
              </DiscordEmbedField>
            </DiscordEmbedFields>
            <span slot="footer">Today at 9:42 PM</span>
          </DiscordEmbed>
        </DiscordMessage>
      </DiscordMessages>
    </>)
}