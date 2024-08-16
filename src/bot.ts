import { Client, Events, REST, Routes, SlashCommandBooleanOption, SlashCommandBuilder } from "discord.js";

import { eventList } from "./events/eventsList";
import constants from "./constants";
import { checkToken } from "./utils/checkToken";
import { setStatus } from "./utils/setStatus";
import { commandsList } from "./events/commandsList";

const token = process.env.BOT_TOKEN ?? "";

export const client = new Client({
  intents: constants.CLIENT_INTENTS
});

eventList.forEach(event => client.on(event.eventKey, event.func))

async function registerCommands() {
  const rest = new REST().setToken(token);

  await rest.put(
    Routes.applicationCommands("980913607632125962"),
    { body: commandsList.map(e => {
        const commandJSON : any = new SlashCommandBuilder()
            .setName(e.name.toLowerCase())
            .setDescription(e.description)
            .toJSON()

        commandJSON.integration_types = [0, 1];

        if(e.options)
        {
          commandJSON.options = e.options;
        }

        return commandJSON;
    })}
  );

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    const command = commandsList.find(e => e.name.toLowerCase() === commandName);
    if (command) {
      await command.func(interaction);
    }
  });
}


async function startUp()
{
  if(!checkToken(token))
  {
    console.log("Your token is invalid! Please set BOT_TOKEN in your .env");
    return;
  }

  console.log("Token is valid!");
  await client.login(token);
  console.log(`Logged in as ${client.user?.displayName}`)

  setStatus();

  registerCommands();
}

startUp();