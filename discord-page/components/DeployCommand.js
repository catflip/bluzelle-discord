export const DeployCommand=()=>{
    return (   <CardCommand
        anything={
          <DiscordMessages>
            <DiscordMessage author="admin">!deploy</DiscordMessage>
            <DiscordMessage
              author="bluzelle"
              bot={true}
              avatar={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
            >
              command has been deployed
            </DiscordMessage>
          </DiscordMessages>
        }
        title="!deploy (ADMIN ONLY)"
        description="The first time you invite the bot to discord you can't use it yet because we are using slash command, so in order to use slash command admin should send this !deploy command in his/her server first"
      />)
}