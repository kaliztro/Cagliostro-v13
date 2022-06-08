const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const client = require("../index");

const Schema = require(`../models/Guilds`);


client.on("interactionCreate", async (interaction) => {

    if (interaction.isButton()) {

        if (interaction.customId === `entradaa`) {
            if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true })

            const channels = interaction.guild.channels.cache
                .filter(c => c.type === 'GUILD_TEXT' && c.permissionsFor(client.user.id).has(['SEND_MESSAGES', 'EMBED_LINKS']) && c.permissionsFor(interaction.user.id).has('SEND_MESSAGES'))

            if (!channels.size) return interaction.reply({ content: 'Não consigo enviar a mensagem em nenhum dos canais do servidor.', ephemeral: true })

            const actionRow = new MessageActionRow()
                .addComponents([
                    new MessageSelectMenu()
                        .setCustomId('channelSelect')
                        .setPlaceholder('Selecione um canal')
                        .addOptions([
                            channels
                                .map(c => {
                                    return {
                                        label: c.name,
                                        value: c.id
                                    }
                                })
                        ])
                ])
            const bot = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('voltar')
                        .setLabel(`Voltar`)
                        .setEmoji(``)
                        .setStyle(`SUCCESS`)
                        .setDisabled(false)
                )

            const embed = new MessageEmbed()
                .setColor(client.config.cor)
                .setTitle("Você escolheu a tela de boas vindas. ")
                .setDescription("Basta vc selecionar o canal de texto onde será enviada a mensagem");

            const reply = await interaction.update({ ephemeral: false, embeds: [embed], components: [actionRow, bot], fetchReply: true })

         
            const collector = reply.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });

            collector.on('collect', i => {
                if (i.user.id === interaction.user.id) {
            if(i.customId === "channelSelect"){
                const canal = i.values[0]
                console.log(canal)
            }
                } 
            });
            
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });



        }

   

        if (interaction.customId === `voltar`) {
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

            await interaction.update({ ephemeral: false, embeds: [embed], components: [row] });
        }













    }
})
