const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require(`../../config.json`);

module.exports = {
    name: "apagar",
    description: "Apaga as mensagens de um canal.",
    options: [
        {
            name: 'quantas',
            type: 'NUMBER',
            description: 'Número de mensagens à serem excluidas.',
            required: true
        }
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'É. \n parece que vc não pode usar esse comando. 😂', ephemeral: true })

        const deleteCount = parseInt(interaction.options.getNumber('quantas'), 10)

        if (!deleteCount || deleteCount < 1 || deleteCount > 99)
            return interaction.reply("forneça um número de até **99 mensagens** a serem excluídas");

        const fetched = await interaction.channel.messages.fetch({
            limit: deleteCount 
        });

        interaction.channel.bulkDelete(fetched)
        .then(() => interaction.reply({ content: `**${interaction.options.getNumber('quantas')} mensagens limpas nesse chat!**`, ephemeral: true }))
    

    },
};