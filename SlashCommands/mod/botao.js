const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "botao",
    description: "Botao de que atribui um cargo",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
    
        const embed = new MessageEmbed()
        .setColor(client.config.cor)
        .setTitle("Para receber notificação de jogos grátis basta clicar no botão abaixo.")

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('cargofreegame')
            .setEmoji(`💯`)
            .setLabel(`Eu quero.`)
            .setStyle(`SUCCESS`)
            .setDisabled(false)
        )
        .addComponents(
            new MessageButton()
                .setCustomId('removercargofreegame')
                .setLabel(`Não quero.`)
                .setEmoji(`💢`)
                .setStyle(`DANGER`)
                .setDisabled(false)
        )
        .addComponents(
            new MessageButton()
                .setCustomId('que?')
                .setLabel(`GRÁTIS?`)
                .setEmoji(`🆓`)
                .setStyle(`SECONDARY`)
                .setDisabled(true)
        )

        await interaction.reply({ ephemeral: false, embeds: [embed], components: [row] });


    },
};