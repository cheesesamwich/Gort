import { client } from "../bot";
import constants from "../constants";

export function setStatus()
{
    client.user?.setPresence({ 
        activities: [{ 
            name: constants.BOT_GAME_NAME, 
            type: constants.BOT_GAME_TYPE, 
            url: constants.BOT_GAME_STREAMING_URL
        }], 
        status: constants.BOT_STATUS
    });
}