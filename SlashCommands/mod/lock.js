const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require(`../../config.json`);

module.exports = {
    name: "lock",
    description: "tranca um canal.",
    options: [{
        name: `canal`,
        type: `CHANNEL`,
        description: `Canal que será trancado.`,
        required: true
    }],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'Você não tem permissão para isso. 😤', ephemeral: true })

        const canal = interaction.options.getChannel(`canal`) 

        if (!client.lockit) client.lockit = [];
        canal.permissionOverwrites.create(interaction.guild.id, { SEND_MESSAGES: false }) 
        interaction.reply({ content: `Canal trancado com sucesso. 👍`, ephemeral: true})
        canal.send(`:lock: este canal foi trancado!`)
    },
};