import * as dotenv from "dotenv";
// @ts-ignore
dotenv.config({ path: `${__dirname}/.env.local` });
import { Client, Message } from "discord.js";
import { helpMessageUser, helpMessageAdmin,consensusStateMessage } from "./lib/helpers";
import { Api } from "./lib/api";
const client = new Client();

client.once("ready", () => {
  console.log("Ready!");
});
client.on("message", async (message: Message) => {
  const command: Array<string> = message.content.split(" ");
  const api = new Api();
  if (message.author.id === "798053928989098014") return;
  switch (command[1]) {
    case "--help":
      message.channel.send(helpMessageUser);
      if (message.member.hasPermission("ADMINISTRATOR"))
        message.channel.send(helpMessageAdmin);
      break;
    case "--consensus-state":
      const data = await api.getConsensusState();
      message.channel.send(JSON.stringify(data));
      break;
  }
});
client.login(process.env.DISCORD_TOKEN);
