const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "server-config",
    description: "Configuração do servidor.",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {


        const embed = new MessageEmbed()
            .setColor(client.config.cor)
            .setTitle("Esse é seu momento de configurar minhas funções no servidor. \n\n ")
            .setDescription("O que posso fazer? \n *Posso enviar uma mensagem de adeus toda vez que alguem entrar no servidor \n *Posso enviar uma mensagem de boas vindas toda vez que alguem sair no servidor \n *Posso atribuir um cargo toda vez que alguém entrar no servidor ");

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('entrada')
            .setEmoji(``)
            .setLabel(`Boas vindas`)
            .setStyle(`SUCCESS`)
            .setDisabled(false)
        )
        .addComponents(
            new MessageButton()
                .setCustomId('saida')
                .setLabel(`Saida`)
                .setEmoji(``)
                .setStyle(`SECONDARY`)
                .setDisabled(false)
        )
        .addComponents(
            new MessageButton()
                .setCustomId('autoCargo')
                .setLabel(`Cargo automático`)
                .setEmoji(``)
                .setStyle(`SECONDARY`)
                .setDisabled(false)
        )
        .addComponents(
            new MessageButton()
                .setCustomId('prefix?')
                .setLabel(`Prefix`)
                .setEmoji(``)
                .setStyle(`SUCCESS`)
                .setDisabled(true)
        )
        .addComponents(
            new MessageButton()
                .setCustomId('sairDoServidor')
                .setLabel(`Sair`)
                .setEmoji(`💢`)
                .setStyle(`DANGER`)
                .setDisabled(false)
        )

        await interaction.reply({ ephemeral: false, embeds: [embed], components: [row] });


        
    }
}