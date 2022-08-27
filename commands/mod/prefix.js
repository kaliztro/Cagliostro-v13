const Schema = require('../../models/Guilds');
const { Client, Message } = require(`discord.js`);

module.exports = {
    name: 'prefix',
    category: "adm",
    aliases: ["prefixo"],
    description: "Altera o prefixo do bot.",

    run: async (client, message, args) => {

        if (!message.member.permissions.has(`ADMINISTRATOR`)) return message.reply("Não!, 🛑 Parece que vc está tentando usar um comando que é permitido somente aos ADMs 🛑.")

        const newPrefix = args[0];
        if(!newPrefix) return message.channel.send("Você deve fornecer o novo prefixo")

        await Schema.findOneAndUpdate({ _id: message.guild.id }, { Prefix: { prefix: newPrefix } }, { upsert: true });
        return message.channel.send(`o prefixo foi atualizado para: **${newPrefix}**`)

    }
}