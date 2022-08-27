const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: 'expulsar',
    description: 'Expulsa um usuário do servidor.',
    options: [
        {
            name: 'usuário',
            type: 'USER',
            description: 'Usuário a ser expulso.',
            required: true
        },
        {
            name: 'motivo',
            type: 'STRING',
            description: 'Motivo da expulsão.',
            required: false
        }
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args, config) => {
        if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({ content: 'você é fraco, vc não consegue expulsar ninguém. chame algum adulto para ajuda-lo.', ephemeral: true })

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({ content: '🛑 Erro ao expulsar o usuário!, eu não tenho permissão para tal coisa.', ephemeral: true })

        const user = interaction.options.getUser('usuário')
        if (interaction.user.id === user.id) return interaction.reply({ content: 'Você não pode se expulsar.', ephemeral: true })

        const reason = interaction.options.getString('motivo') || 'Parece que foi sem motivo.'

        const embed = new MessageEmbed()
            .setAuthor(`${interaction.user.username} foi o mandante da expulsão.`, interaction.user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
            .setThumbnail("")
            .setColor(config.cor)
            .setDescription(`\n\n**A vítima foi a(o):** \`${user.tag}\` \n**Motivo:**\`${reason}\``)
            .setImage(user.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
            .setTimestamp()

        interaction.guild.members.kick(user, { reason: reason })
            .then(() => interaction.reply({ embeds: [embed] }))
            .catch(() => interaction.reply({ content: '🛑 Erro ao expulsar o usuário!', ephemeral: true }))

    },
};