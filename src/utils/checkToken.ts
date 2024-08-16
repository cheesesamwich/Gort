import { Client } from "discord.js";

// great code right here
// "10/10 exquisite" - the times
export async function checkToken(token) 
{
    const client = new Client({intents: []});
    try 
    {
        await client.login(token);
        return true;
    } 
    catch (error) 
    {
        return false;
    }
}