const { MessageActionRow, MessageButton } = require("discord.js")
const Discord = require("discord.js");
const config = require(`../../config/config.json`);

module.exports = {
    name: "freegames",
    aliases: ["free"],
    usage: `freegame ou free`,
    description: "Cargo por reacao.",

    run: async (client, message, args) => {

        if(!message.member.permissions.has(`ADMINISTRATOR`)) return message.reply("Não!, 🛑 Parece que vc está tentando usar um comando que é permitido somente aos ADMs 🛑.")

        const embed = new Discord.MessageEmbed()
        .setColor(config.cor)
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
        // .addComponents(
        //     new MessageButton()
        //         .setCustomId('que?')
        //         .setLabel(`GRÁTIS?`)
        //         .setEmoji(`🆓`)
        //         .setStyle(`SECONDARY`)
        //         .setDisabled(true)
        // )




        await message.channel.send({
            //content: 'are you sure?',
            components: [row],
            embeds: [embed],
        })

    }
}