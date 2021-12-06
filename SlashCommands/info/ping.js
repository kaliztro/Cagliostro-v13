const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Mostra o ping do bot",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        await interaction.reply(`**Ping?**`);
        await interaction.editReply(`🏓 **| Pong!**\n Latência da API: **${Math.round(client.ws.ping)}ms**`)


    },
};



