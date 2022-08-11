const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

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
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ content: 'Você não tem permissão para isso. 😤', ephemeral: true })

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({ content: 'Eu não tenho permissao de gerenciar canais', ephemeral: true })

        const canal = interaction.options.getChannel(`canal`) 

        if (!client.lockit) client.lockit = [];
        canal.permissionOverwrites.create(interaction.guild.id, { SEND_MESSAGES: false }) 
        interaction.reply({ content: `Canal trancado com sucesso. 👍`, ephemeral: true})
        canal.send(`:lock: este canal foi trancado!`)
    },
};