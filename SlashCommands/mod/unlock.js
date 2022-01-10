const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require(`../../config.json`);

module.exports = {
    name: "unlock",
    description: "destranca um canal.",
    options: [{
        name: `canal`,
        type: `CHANNEL`,
        description: `Canal que será destrancado.`,
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
        canal.permissionOverwrites.create(interaction.guild.id, { SEND_MESSAGES: true }) //assim so tranca o canal que foi enviada a mensagem

        interaction.reply({ content: `Canal destrancado com sucesso. 👍`, ephemeral: true})
        canal.send(`:unlock: este canal foi destrancado!`)
    },
};
