const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require(`../../config.json`);

const ms = require(`ms`);

module.exports = {
    name: 'mutar',
    description: 'Coloca o usuario de castigo.',
    options: [
        {
            name: 'usuário',
            type: 'USER',
            description: 'Usuário a ser castigado.',
            required: true
        },
        {
            name: 'tempo',
            type: 'STRING',
            description: 'Tempo do castigo! ex: 50s, 2m, 1h',
            required: true
        },
        {
            name: 'motivo',
            type: 'STRING',
            description: 'Motivo do castigo.',
            required: false
        },
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'você não pode mutar outro membro!', ephemeral: true })

        let user = interaction.options.getUser(`usuário`)
        let member = interaction.guild.members.cache.get(user.id)
        let timer = interaction.options.getString(`tempo`)
        let reason = interaction.options.getString('motivo') || `Parece que foi sem motivo.`

        let time = ms(timer)

        const embed = new MessageEmbed()
        .setAuthor(`${user.tag} foi Mutado 🤫`, member.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`** Mutado por:** ${interaction.user.username} \n **Motivo:** ${reason} \n **Tempo:** ${timer}`)
        .setColor(config.cor)
        .setTimestamp()


        member.timeout(time, reason)
        .then(interaction.reply({embeds: [embed]}))

        

    },
};