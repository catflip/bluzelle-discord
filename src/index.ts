import * as dotenv from "dotenv";
// @ts-ignore
dotenv.config();
import { Client, Message, Permissions, TextChannel } from "discord.js";
import {
  averageBlockTime,
  consensusStateEmbed,
  helpMessage,
  latestBlockEmbed,
  marketDataEmbed,
  onlineVotingPowerEmbed,
  runningEmbed,
  setScheduling,
  stopScheduling,
  totalBlocks,
  totalValidator,
  updateScheduling,
  validatorByAddressEmbed,
} from "./lib/interactions";
import { commandList } from "./lib/helpers";

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
let periodic = new Map();
client.once("ready", async () => {
  console.log("Ready!");
});
client.on("message", async (message: Message) => {
  if (message?.member?.permissions.has("ADMINISTRATOR")) {
    await client.application?.fetch();
  }

  if (
    message.content.toLowerCase() === "!deploy" &&
    message?.member?.permissions.has("ADMINISTRATOR")
  ) {
    await client.guilds.cache.get((message?.guild?.id as any))?.commands.set(commandList);
    (client.channels.cache.get(message.channel.id) as TextChannel).send(
      "command has been deployed"
    );
  }
  if (
    message.content.toLowerCase() === "!undeploy" &&
    message?.member?.permissions.has("ADMINISTRATOR")
  ) {
    await client.guilds.cache
      .get((message?.guild?.id as any))
      ?.commands.set([]);
    if (periodic.has(message?.guild?.id)) {
      if (periodic.get(message?.guild?.id).size > 0) {
        const channel = Array.from(periodic.get(message?.guild?.id).keys());
        if (channel.length > 0) {
          for (const a in channel) {
            const data = Array.from(
              periodic.get(message?.guild?.id).get(channel[a]).keys()
            );
            if (data.length > 0) {
              for (const b in data) {
                clearInterval(
                  periodic.get(message?.guild?.id).get(channel[a]).get(data[b])
                );
                periodic.get(message?.guild?.id).get(channel[a]).delete(data[b]);
              }
            }
          }
        }
      }
    }
    (client.channels.cache.get(message.channel.id) as TextChannel).send(
      "command has been undeployed"
    );
  }
});
client.on("interaction", async (interaction) => {
  if (interaction.isButton()) {
    switch (interaction.customID.split(":")[0]) {
      case "getvalidator":
        interaction.reply({
          embeds: [
            await validatorByAddressEmbed(interaction.customID.split(":")[1]),
          ],
        });
        break;
      default:
        interaction.reply({
          content: "can't find the command you looking for",
          ephemeral: true,
        });
        break;
    }
  }
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "stop":
      if (
        !(interaction?.member?.permissions as Permissions).has("ADMINISTRATOR")
      )
        return await interaction.reply({
          content:
            "sorry you can't use this command only admin can use this command",
          ephemeral: true,
        });
      const dataSwitchStop = interaction?.options?.get("data")?.value;
      stopScheduling(periodic, interaction, dataSwitchStop as any);
      break;
    case "update":
      if (
        !(interaction?.member?.permissions as Permissions).has("ADMINISTRATOR")
      )
        return await interaction.reply({
          content:
            "sorry you can't use this command only admin can use this command",
          ephemeral: true,
        });
      const dataSwitchUpdate = interaction?.options?.get("data")?.value;
      const timeUpdate = interaction?.options?.get("time")?.value;
      const perUpdate = interaction?.options?.get("per")?.value;
      updateScheduling(
        periodic,
        dataSwitchUpdate as any,
        client,
        interaction,
        (timeUpdate as number),
        (perUpdate as string)
      );
      break;
    case "set":
      if (
        !(interaction?.member?.permissions as Permissions).has("ADMINISTRATOR")
      )
        return await interaction.reply({
          content:
            "sorry you can't use this command only admin can use this command",
          ephemeral: true,
        });
      const dataSwitch = interaction?.options?.get("data")?.value;
      const timeSet = interaction?.options?.get("time")?.value;
      const perSet = interaction?.options?.get("per")?.value;
      setScheduling(
        periodic,
        dataSwitch as any,
        client,
        interaction,
        (timeSet as number),
        (perSet as string)
      );

      break;
    case "total-validator":
            await interaction.reply({ embeds: [await totalValidator()] });
      break;
    case "total-block":
      await interaction.reply({ embeds: [await totalBlocks()] });
      break;
    case "block-times":
      await interaction.reply({ embeds: [await averageBlockTime()] });
      break;
    case "consensus-state":
      await interaction.reply({
        embeds: [(await consensusStateEmbed()).embed],
        components: [(await consensusStateEmbed()).row],
      });
      break;
    case "online-voting-power":
      await interaction.reply({ embeds: [await onlineVotingPowerEmbed()] });
      break;
    case "latest-block":
      await interaction.reply({ embeds: [await latestBlockEmbed()] });
      break;
    case "market-data":
      await interaction.reply({ embeds: [await marketDataEmbed()] });
      break;
    case "running":
      if (
        !(interaction?.member?.permissions as Permissions).has("ADMINISTRATOR")
      )
        return await interaction.reply({
          content:
            "sorry you can't use this command only admin can use this command",
          ephemeral: true,
        });
      await interaction.reply({
        embeds: [runningEmbed(periodic, interaction)],
      });
      break;
    case "help":
      await interaction.reply({
        embeds: [helpMessage.embed],
        components: [helpMessage.row],
      });
      break;
    default:
      interaction.reply({
        content: "can't find the command you looking for",
        ephemeral: true,
      });
      break;
  }
});
client.login(process.env.DISCORD_TOKEN);
