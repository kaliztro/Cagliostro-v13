const client = require("../index");
const id = require(`../config/usuarios.json`);

const PREFIX = client.config.PREFIX

const Schema = require('../models/Guilds');

client.on("messageCreate", async (message) => {

    const guildConfig = await Schema.findOne({ _id: message.guild.id });
    const prefix = guildConfig?.Prefix.prefix ?? PREFIX

    // menção
    if (!message.guild) return;

    const emoj = client.guilds.cache.get("545386837846523905");
    const emoji = emoj?.emojis.cache.find(emoji => emoji.name === "cagliostro") || `👌`;

    let user = message.author.username
    let frases = [`olá ${user}`,`iai ${user}`, `coé ${user}`, `bah`, `Ué, quem é tu?`, `coé ${user}, pinga eu não`];

    let rand = frases[Math.floor(Math.random()* frases.length)];

    const menção = message.mentions.users.first()
    if (menção) {
        if (menção.id === `${client.user.id}` && message.author.bot) { return message.channel.send(`Pinga eu não bot 🤬`) };
        if (menção.id === `${client.user.id}` && message.author.id === id.otelo) { return message.channel.send(`Pinga eu não nóia`)};

        if (menção.id === `${client.user.id}`) { return message.channel.send(`${emoji}  ${rand}! Meu prefixo neste servidor é: **${prefix}**, Para mais informações utilize:  **${prefix}ajuda**`)}
    };



});


