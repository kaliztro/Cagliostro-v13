const Discord = require("discord.js");
const config = require("../../config.json");
const { MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: "ajuda",
    aliases: ["aj"],

    run: async(client, message, args) => {

        let embed1 = new Discord.MessageEmbed()
        .setColor(config.cor)
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Aqui estão os meus comandos**`);

        let painel = new MessageActionRow().addComponents( new MessageSelectMenu()
        .setCustomId(`menu`)
        .setPlaceholder(`veja meus comandos.`) // Mensagem estampada
        .addOptions([

            {
                label: `Inicial`,
                description: `Aqui estão os meus comandos`,
                emoji: `📋`,
                value: `ini`,
            },
            {
                label: `Informações`,
                description: `comandos de Informação`,
                emoji: `📻`,
                value: `info`,
            },
            {
                label: `Moderação`,
                description: `comandos de Moderação`,
                emoji: `🦾`,
                value: `mod`,
            },
            {
                label: `ajustes`,
                description: `comandos de ajustes`,
                emoji: `⚙️`,
                value: `ajus`,
            },
        ])

      )

        message.reply({ embeds: [embed1], components: [painel] }).then(msg => {

            const filtro = (interaction) => 
            interaction.isSelectMenu()

            const coletor = msg.createMessageComponentCollector({
                filtro
            });

            coletor.on(`collect`, async (collected) => {

                let valor = collected.values[0]
                collected.deferUpdate()

                if (valor === `ini` ) {

                    let embed3 = new Discord.MessageEmbed()
                    .setColor(config.cor)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Tela de inicio.`);

                    msg.edit({ embeds: [embed3], components: [painel] });
                };
                if (valor === `info` ) {

                    let embed2 = new Discord.MessageEmbed()
                    .setColor(config.cor)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Aqui estão os meus comandos que ira deixar você informado.** \n\n **•avatar**\nMostra o seu avatar, ou o avatar de quem vc mencionar.\n 
                    **•botinfo**\nMostra as informações do bot.\n\n **•serverinfo**\nMostra as Informação do servidor.\n\n **•userinfo**\nMostra as informações do usuario mencionado.\n 
                    **•ping**\nMostra a latência da API.\n\n **•sugestão**\nUse esse comando para enviar sugestões aos membros da adm do servidor.\n
                    **•tempo**\nMostra o tempo que o bot esta ON.`);

                    msg.edit({ embeds: [embed2], components: [painel] });
                };
                if (valor === `mod` ) {

                    let embed3 = new Discord.MessageEmbed()
                    .setColor(config.cor)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Aqui estão os meus comandos de moderação** \n\n lista de comandos`);

                    msg.edit({ embeds: [embed3], components: [painel] });
                };
                if (valor === `ajus` ) {

                    let embed3 = new Discord.MessageEmbed()
                    .setColor(config.cor)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Aqui estão os meus comandos de ajustes** \n\n lista de comandos`);

                    msg.edit({ embeds: [embed3], components: [painel] });
                };
            })
        })

    }
}