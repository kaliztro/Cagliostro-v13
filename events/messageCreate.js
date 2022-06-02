const client = require("../index");
const PREFIX = client.config.PREFIX
const id = require(`../ids/usuarios.json`)

const Schema = require('../models/Guilds');

client.on("messageCreate", async (message) => {

    const guildConfig = await Schema.findOne({ _id: message.guild.id });
    const prefix = guildConfig?.Prefix.prefix ?? PREFIX

    // menção
    if (!message.guild) return;

    const emoj = client.guilds.cache.get("545386837846523905");
    const emoji = emoj.emojis.cache.find(emoji => emoji.name === "cagliostro");

    const menção = message.mentions.users.first()
    if (menção) {
        if (menção.id === `${client.user.id}` && message.author.id === id.otelo) { return message.channel.send(`Pinga eu não nóia`)};
        if (menção.id === `${client.user.id}`) { return message.channel.send(`${emoji}   Olá ${message.author.username}! Meu prefixo neste servidor é: **${prefix}**, Para mais informações utilize:  **${prefix}ajuda**`)}
    };



});




