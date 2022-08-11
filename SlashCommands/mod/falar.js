const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: "falar",
    description: "Bot fala o que for escrito.",
    options: [
        {
            name: `canal`,
            type: `CHANNEL`,
            description: `Canal onde a mensagem será enviada.`,
            required: true
        },
        {
            name: `mensagem`,
            type: `STRING`,
            description: `A mensagem que será enviada no canal.`,
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
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ content: 'Você não manda em mim. 😡', ephemeral: true })

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return interaction.reply({ content: '🛑 Eu não tenho permissao para enviar mensagens.', ephemeral: true })

        const canal = interaction.options.getChannel(`canal`)
        if (![`GUILD_TEXT`, `GUILD_ANNOUCEMENTS`].includes(canal.type)) return interaction.reply({ content: `Não consegui falar nada. vc informou um canal de texto válido?`, ephemeral: true })

        const texto = interaction.options.getString(`mensagem`)
        canal.send({ content: texto })
            .then(() => interaction.reply({ content: `Mensagem enviada com sucesso no canal \`${canal.name}\`.`, ephemeral: true }))
            .catch(() => interaction.reply({ content: `Deu erro aqui! eu não consegui enviar a mensagem.😖`, ephemeral: true }))
    },
};
