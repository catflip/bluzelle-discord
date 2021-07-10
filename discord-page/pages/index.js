import Head from 'next/head'
import { DiscordMention, DiscordMessage, DiscordMessages } from '@skyra/discord-components-react';
import { config } from "../utils/config";
import { Card } from "../components/Card";
export default function Home() {
  return (
    <div className="max-w-lg mx-auto mt-20 p-10 justify-center items-center">
    <Head>
      <title>{`Home`}</title>
    </Head>
    <div className="flex items-center justify-center mb-5 block">
      <a href="/">
      <img
        src={`https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg`}
        height={75}
        width={75}
        loading="eager"
        className="rounded-full shadow-sm"
        alt={`Discord server icon of ${`Home`}`}
      />
      </a>
    </div>
    <h2 className="text-center font-bold text-5xl">{`Home`}</h2>
    <div className="text-center mb-10 mt-2">
      <a
        href={`#`}
        className="bg-indigo-50 font-medium mt-5 text-indigo-600 px-4 py-1.5 rounded-full inline-block"
      >
        Bluzelle Discord Bot
      </a>
    </div>
    <h3
      className={
        "rounded-md mb-10 text-center p-2 bg-green-50 text-green-500"
      }
    >
     Bluzelle discord bot is a bot in discord that can send data from bluzelle network straight to discord
    </h3>
    <div className="grid grid-cols-2 gap-2">
      <Card
        href={config.discord_invite}
        description="Invite the bot"
        title="Invite"
      />
       <Card
        href={`/commands`}
        description="Command list"
        title="Commands"
      />
    </div>
   
  </div>
  )
}
