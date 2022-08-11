const Discord = require("discord.js");
const config = require(`../../config/config.json`);
const { MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: "ajuda",
    aliases: ["aj"],

    run: async(client, message, args) => {

        let embed1 = new Discord.MessageEmbed()
        .setColor(config.cor)
        .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`\n **Selecione a categoria de comando.**\n\n  📻 **Informações** \n\n 🦾 **Moderação** \n\n 🎶 **Música**  \n\n ⚙️ **Configuração** \n\n 🥳 **Diversão**`);

        let painel = new MessageActionRow().addComponents( new MessageSelectMenu()
        .setCustomId(`menu`)
        .setPlaceholder(`veja meus comandos.`) 
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
            {
                label: `musica`,
                description: `comandos de musica`,
                emoji: `🎶`,
                value: `mus`,
            },
            {
                label: `Diversão`,
                description: `comandos de diversão`,
                emoji: `🥳`,
                value: `dive`,
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
                    .setDescription(`\n **Selecione a categoria de comando.**\n\n  📻 **Informações** \n\n 🦾 **Moderação** \n\n ⚙️ **Configuração** \n\n 🥳 **Diversão**`);

                    msg.edit({ embeds: [embed3], components: [painel] });
                };
                if (valor === `info` ) {

                    let embed2 = new Discord.MessageEmbed()
                    .setColor(config.cor)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Aqui estão os meus comandos que ira deixar você informado.** \n\n **/avatar**\nMostra o seu avatar, ou o avatar de quem vc mencionar.\n 
                    **/botinfo**\nMostra as informações do bot.\n\n **/serverinfo**\nMostra as Informação do servidor.\n\n **/userinfo**\nMostra as informações do usuario mencionado.\n 
                    **/ping**\nMostra a latência da API.\n\n **/sugestão**\nUse esse comando para enviar sugestões aos membros da adm do servidor.\n
                    **/tempo**\nMostra o tempo que o bot esta ON.`);

                    msg.edit({ embeds: [embed2], components: [painel] });
                };
                if (valor === `mod` ) {

                    let embed3 = new Discord.MessageEmbed()
                    .setColor(config.cor)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Aqui estão os meus comandos de moderação** \n\n **/apagar**\nApaga as mensagens de um canal.\n\n**/ban**\nBane um membro do servidor.\n\n**/expulsar**\nExpulsa um membro do servidor.\n
                    **/cargo**\nAtribui um cargo ao membro mencionado.\n\n**/rcargo**\nRemove um cargo do membro mencionado.\n\n**/falar**\nBot fala o que for escrito.\n\n**/lock**\ntranca um canal.\n\n**/unlock**\nDestranca um canal.\n
                    **/prefix**\nAltera o prefixo do bot.\n\n**/say**\nBot fala o que for escrito sé que em Embed.\n\n**/mutar**\nMuta o membro.\n\n**/disconnect**\nDesconecta o usuario do canal de voz.\n\n `);

                    msg.edit({ embeds: [embed3], components: [painel] });
                };
                if (valor === `ajus` ) {

                    let embed3 = new Discord.MessageEmbed()
                    .setColor(config.cor)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Aqui estão os meus comandos de ajustes** \n\n **ERRO 404** Comandos não encontrados`);

                    msg.edit({ embeds: [embed3], components: [painel] });
                };
                if (valor === `mus` ) {

                    let embed3 = new Discord.MessageEmbed()
                    .setColor(config.cor)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Aqui estão os meus comandos de música** \n\n **/play**\n\n**/pause**\n\n**/stop**\n\n**/loop**\n\n**/resume**\n\n**/skip**\n\n**/queue**\n\n**/volume**\n\n**/nowplaying**`);

                    msg.edit({ embeds: [embed3], components: [painel] });
                };
                if (valor === `dive` ) {

                    let embed3 = new Discord.MessageEmbed()
                    .setColor(config.cor)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**Aqui estão os meus comandos de diversão** \n\n **/coinflip**\nJogo de Cara ou Coroa.\n\n **/emoji**\nEnvia o emoji escolhido no chat. \n\n **/8ball**\nResponde a sua pergunta`);

                    msg.edit({ embeds: [embed3], components: [painel] });
                };
            })
        })

    }
}