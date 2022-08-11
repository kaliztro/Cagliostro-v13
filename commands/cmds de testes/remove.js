const Discord = require("discord.js");
const config = require(`../../config/config.json`);

module.exports = {
    name: "remove",
    description: "Remove os comandos do servidor.",
    category: "dono",
    run: async (client, message, args) => {

        const guilda = message.guild.id

        await client.guilds.cache.get(guilda).commands.set([]);
        
        message.react("✅");
        
    }
}
