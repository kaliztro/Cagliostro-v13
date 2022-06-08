const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const client = require("../index");

const Schema = require(`../models/Guilds`);


client.on("interactionCreate", async (interaction) => {

    if (interaction.isButton()) {

        if (interaction.customId === `entrada`) {
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
                            {
                                label: `Remover`,
                                description: `Remover canal`,
                                emoji: `❌`,
                                value: `remover`,
                            },

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

            const filtro = (i) => i.user.id === interaction.user.id

            const collector = reply.createMessageComponentCollector({ filter: filtro })

            collector.on('collect', async (i) => {
                const idCanal = i.values[0]

                await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { Welcome: { canal: idCanal } }, { upsert: true });

                interaction.channel.send({content: `canal definido foi ${idCanal}`, ephemeral: true})
                console.log(idCanal)

            })

            



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
