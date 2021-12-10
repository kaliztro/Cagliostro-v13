const Discord = require("discord.js");
const client = require("../../index");

const PREFIX = client.config.PREFIX

const Schema = require('../../models/Guilds');

module.exports = {
    name: "emoji",
    category: "outros",
    aliases: [],
    usage: `emoji e o nome do emoji.`,
    description: "Envia o emoji escolhido no chat.",
    run: async (client, message, args) => {


        const guildConfig = await Schema.findOne({ _id: message.guild.id });
        const prefix = guildConfig?.Prefix.prefix ?? PREFIX

        message.delete();

        if (!args[0])
            return message.channel.send(
                `**${message.author.username}, a sintaxe correta é:** ` +
                "`" +
                `${prefix}emoji nome do emoji\``
            ); 
        let emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0]);

        if (!emoji) {
            message.channel.send(
                "`" + args[0] + "` **não é um emoji deste servidor.**"
            );
        } else if (emoji.animated === true) {
            message.channel.send(`<a:${args[0]}:${emoji.id}>`);
        } else {
            message.channel.send(`<:${args[0]}:${emoji.id}>`);
        }
    }
};