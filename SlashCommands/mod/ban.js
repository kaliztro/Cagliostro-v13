const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const config = require(`../../config.json`);

module.exports = {
    name: 'ban',
    description: 'Bane um usuário do servidor.',
    options: [
        {
            name: 'usuário',
            type: 'USER',
            description: 'Usuário a ser banido.',
            required: true
        },
        {
            name: 'motivo',
            type: 'STRING',
            description: 'Motivo do ban.',
            required: false
        }
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: 'Você precisa de permissão para banir membros no servidor.', ephemeral: true })

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: 'Eu não tenho permissao para banir usuarios', ephemeral: true })

        const user = interaction.options.getUser('usuário')
        if (interaction.user.id === user.id) return interaction.reply({ content: 'Você não pode se banir.', ephemeral: true })

        const reason = interaction.options.getString('motivo') || 'Parece que foi sem motivo.'

        const embed = new MessageEmbed()
        .setAuthor(`${interaction.user.username} foi o mandante do Ban.`, interaction.user.displayAvatarURL({
            dynamic: true,
            size: 1024
        }) )
        .setThumbnail("")
        .setColor(config.cor)
        .setDescription(`\n\n**A vítima foi a(o):** \`${user.tag}\` \n**Motivo:**\`${reason}\``) 
        .setImage(user.displayAvatarURL({
            dynamic: true,
            size: 1024
        }))
        .setTimestamp()

        interaction.guild.members.ban(user, { reason: reason })
            .then(() => interaction.reply({ embeds: [embed] }))
            .catch(() => interaction.reply({ content: '🛑 Erro ao banir o usuário!', ephemeral: true }))
    
    },
};