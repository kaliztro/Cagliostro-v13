const Discord = require("discord.js");
const config = require(`../../config/config.json`);

module.exports = {
    name: "ping",
    aliases: [],
    description: "Mostra a latência da API.",

    run: async(client, message, args) => {

        let embed1 = new Discord.MessageEmbed()
        .setColor(config.cor)
        .setDescription(`**Ping?**`);

        let embed2 = new Discord.MessageEmbed()
        .setColor(config.cor)
        .setDescription(`🏓 **| Pong!**\nLatência da API: **${Math.round(client.ws.ping)}ms**`);

        await message.reply({ embeds: [embed1]}).then(msg => {
            setTimeout( () => {
                msg.edit({ embeds: [embed2]})
            },1000)
        })
       
    }
}