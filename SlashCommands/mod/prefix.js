const { Client, CommandInteraction } = require("discord.js");
const Schema = require('../../models/Guilds');

module.exports = {
    name: "prefix",
    description: "Altera o prefixo do bot.",
    options: [
        {
            name: `novo-prefixo`,
            type: `STRING`,
            description: `novo Prefixo.`,
            required: true
        },
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: 'Não!, 🛑 Parece que vc está tentando usar um comando que é permitido somente aos ADMs 🛑.', ephemeral: true })

        const newPrefix = interaction.options.getString(`novo-prefixo`)

        await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { Prefix: { prefix: newPrefix } }, { upsert: true })
            .then(() => interaction.reply({ content: `o prefixo foi atualizado para: **${newPrefix}**`, ephemeral: true }))

    },
};



