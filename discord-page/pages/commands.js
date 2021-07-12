import Head from "next/head";
import { GetStaticProps } from "next";
import { CardCommand } from "../components/CardCommand";
import { config } from "../utils/config";

import {
  DiscordEmbed,
  DiscordEmbedFields,
  DiscordEmbedField,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
import { HelpCommand } from "../components/HelpCommand";
import { DeployCommand } from "../components/DeployCommand";

export default function Home(props) {
  return (
    <div className="max-w-lg mx-auto mt-20 p-10 justify-center items-center">
      <Head>
        <title>Commands</title>
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
      <h2 className="text-center font-bold text-5xl">Bluzelle</h2>
      <div className="text-center mb-10 mt-2">
        <a
          href={`#`}
          className="bg-indigo-50 font-medium mt-5 text-indigo-600 px-4 py-1.5 rounded-full inline-block"
        >
          Command List
        </a>
      </div>
      <h3
        className={
          "rounded-md mb-10 text-center p-2 bg-green-50 text-green-500"
        }
      >
        This is the list of command that you can use to get data from bluzelle
        network in discord
      </h3>
      <div className="grid  gap-2">
     <DeployCommand/>
        <CardCommand
          description="To show which command can be used by admin or user"
          title="/help"
          anything={<HelpCommand/>}
        />
        <CardCommand
          description="this command will get total validator just like in big dipper"
          title="/total-validator"
          anything={
            <>
              <img src="https://i.gyazo.com/c0390a4ec7dc01ded29ffe4bca0b69af.png" />
              <DiscordMessages>
                <DiscordMessage author={"User"}>
                  /total-validator
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
                      <DiscordEmbedField fieldTitle="Active Validators">
                        5 out of 5 validators
                      </DiscordEmbedField>
                    </DiscordEmbedFields>
                    <span slot="footer">Today at 9:42 PM</span>
                  </DiscordEmbed>
                </DiscordMessage>
              </DiscordMessages>
            </>
          }
        />
        <CardCommand
          description="to get latest block height"
          title="/total-block"
          anything={
            <>
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
                    </DiscordEmbedFields>
                    <span slot="footer">Today at 9:42 PM</span>
                  </DiscordEmbed>
                </DiscordMessage>
              </DiscordMessages>
            </>
          }
        />
      </div>
    </div>
  );
}
