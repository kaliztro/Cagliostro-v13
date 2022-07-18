const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu, Permissions } = require("discord.js");

module.exports = {
    name: 'say',
    description: 'Faz com que o bot diga alguma mensagem.',
    options: [
        {
            name: 'mensagem',
            type: 'STRING',
            description: 'A mensagem que será enviada no canal.',
            required: true
        }
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args, config) => {
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true })

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return interaction.reply({ content: '🛑 Eu não tenho permissao para enviar mensagens.', ephemeral: true })

        const channels = interaction.guild.channels.cache
            .filter(c => c.type === 'GUILD_TEXT' && c.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'EMBED_LINKS']) && c.permissionsFor(interaction.user.id).has('SEND_MESSAGES'))

        if (!channels.size) return interaction.reply({ content: 'Não consigo enviar a mensagem em nenhum dos canais do servidor.', ephemeral: true })

        const actionRow = new MessageActionRow()
            .addComponents([
                new MessageSelectMenu()
                    .setCustomId('channelSelect')
                    .setPlaceholder('Selecione um canal')
                    .addOptions(
                        channels
                            .map(c => {
                                return {
                                    label: c.name,
                                    value: c.id
                                }
                            })
                    )
            ])

        const reply = await interaction.reply({
            content: '**Selecione abaixo o canal onde deseja enviar a mensagem**',
            components: [actionRow],
            fetchReply: true
        })

        const filter = (i) => i.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, max: 1, time: (3 * 60000) })

        collector.on('collect', (i) => {
            const idCanal = i.values[0]
            const canal = interaction.guild.channels.cache.get(idCanal)

            const texto = interaction.options.getString('mensagem')

            const embed = new MessageEmbed()
                .setTitle(`Uma mensagem foi enviada neste canal.`)
                .setDescription(texto)
                .setColor(config.cor)
                .setTimestamp()

            canal.send({ embeds: [embed] })
                .then(() => interaction.editReply({ content: `Mensagem enviada com sucesso no canal ${canal.toString()}.`, components: [] }))
                .catch(() => interaction.editReply({ content: `ERRO | Erro ao tentar enviar a mensagem no canal.`, components: [] }))
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time') interaction.editReply({ content: 'O tempo para informar o canal se esgotou!', components: [] })
        })
    },
};
