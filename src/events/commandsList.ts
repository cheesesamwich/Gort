import { AttachmentBuilder, CommandInteraction, ApplicationCommandOptionBase, SlashCommandBooleanOption, SlashCommandStringOption, SlashCommandUserOption, User, EmbedBuilder } from "discord.js";

export interface SimpleCommand 
{
    name: string;
    description: string;
    func: (interaction) => void;
    options?: ApplicationCommandOptionBase[];
}

export const commandsList: SimpleCommand[] = 
[
    {
        name: "gort", 
        description: "Replies with a message to test",
        func: interaction => interaction.reply("gort")
    },
    {
        name: "pfp",
        description: "Gets the profile picture of a user",
        func: interaction => 
        {
            const userParameter : User = interaction.options.getUser("user", true);

            interaction.reply({embeds: 
            [
                new EmbedBuilder().setImage(userParameter.avatarURL({size: 4096})).setDescription(`<@${userParameter.id}>'s pfp`)
            ]});
        },
        options: 
        [
            new SlashCommandUserOption().setName("user").setRequired(true).setDescription("The user to get the profile picture of")
        ]
    },
    {
        name: "echo",
        description: "Gort repeats what you input",
        func: interaction => interaction.reply(interaction.options.getString("input", true) ?? "provide an input STUPID..."),
        options: 
        [
            new SlashCommandStringOption().setName("input").setDescription("What gort should say")
        ]
    },
    {
        name: "vencordbadge",
        description: "Gets the vencord badges of a user",
        func: async interaction => 
        {
            const userParameter : User = interaction.options.getUser("user", true);
            
            const badge = await fetch("https://badges.vencord.dev/badges.json").then(e => e.json())[userParameter.id];

            if(!badge)
            {
                interaction.reply("this person doesn't have a badge you IDIOT...");
                return;
            }

            interaction.reply({embeds: 
            [
                new EmbedBuilder().setDescription(`<@${userParameter.id}>'s badge(s)`),
                ...badge.map(e => 
                    new EmbedBuilder().setTitle(e.tooltip).setImage(e.badge)
                )
            ]});
        },
        options: 
        [
            new SlashCommandUserOption().setName("user").setRequired(true).setDescription("The user to get the badge of")
        ]
    }
];