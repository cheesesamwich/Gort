import { GatewayIntentBits, PresenceStatusData, ActivityType } from "discord.js";

let constants = 
{
    NO_COMMAND_ERROR_RESPONSE: "There is no command with that name!",
    EMPTY_OR_NULL_TOKEN: "Token file is empty or invalid!",
    COMMAND_PREFIX: "gort",
    CLIENT_INTENTS:
    [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    BOT_GAME_NAME: "murder competition",
    BOT_GAME_STREAMING_URL: "https://www.youtube.com/watch?v=s9oQRKsROF8",
    BOT_GAME_TYPE: ActivityType.Competing,
    BOT_STATUS: 'online' as PresenceStatusData

}

export default constants;
