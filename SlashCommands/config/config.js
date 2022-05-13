const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require(`../../config.json`);
const Schema = require('../../models/Guilds');

module.exports = {
    type: 'SUB_COMMAND',
    name: 'config',
    description: 'erro 404 Descrição não encontrada.',
    options: [
        {
            type: 'CHANNEL',
            name: 'entrada',
            description: 'Canal de texto onde a mensagem será enviada.',
            required: false
        },
        {
            type: 'CHANNEL',
            name: 'saida',
            description: 'Canal de texto onde a mensagem será enviada.',
            required: false
        },
        {
            type: 'ROLE',
            name: 'auto-cargo',
            description: 'Canal de texto onde a mensagem será enviada.',
            required: false
        },
    ],


    run: async (client, interaction, args) => {

        const entrada = interaction.options.getChannel('entrada')
        const saida = interaction.options.getChannel('saida')
        const cargo = interaction.options.getRole('auto-cargo')

        if (entrada && saida && cargo) {
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { Welcome: { canal: entrada } }, { upsert: true });
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { Saida: { canal: saida } }, { upsert: true });
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { AutoCargo: { cargo: cargo } }, { upsert: true });
            interaction.reply({ content: `o Welcome definido foi: ${entrada}, o Saida definido foi: ${saida}, o cargo definido foi: ${cargo} `, ephemeral: true });
        }
        else if (entrada && saida) {
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { Welcome: { canal: entrada } }, { upsert: true });
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { Saida: { canal: saida } }, { upsert: true });
            interaction.reply({ content: `o Welcome definido foi: ${entrada}, o Saida definido foi: ${saida}`, ephemeral: true });
        }
        else if (entrada && cargo) {
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { Welcome: { canal: entrada } }, { upsert: true });
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { AutoCargo: { cargo: cargo } }, { upsert: true });
            interaction.reply({ content: `o Welcome definido foi: ${entrada}, o cargo definido foi: ${cargo} `, ephemeral: true });
        }
        else if (saida && cargo) {
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { Saida: { canal: saida } }, { upsert: true });
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { AutoCargo: { cargo: cargo } }, { upsert: true });
            interaction.reply({ content: `o Saida definido foi: ${saida}, o cargo definido foi: ${cargo} `, ephemeral: true });
        }
        else if (entrada) {
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { Welcome: { canal: entrada } }, { upsert: true });
            interaction.reply({ content: `o Welcome definido foi: ${entrada}`, ephemeral: true });
        }
        else if (saida) {
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { Saida: { canal: saida } }, { upsert: true });
            interaction.reply({ content: `o Saida definido foi: ${saida}`, ephemeral: true });
        }
        else if (cargo) {
            await Schema.findOneAndUpdate({ _id: interaction.guild.id }, { AutoCargo: { cargo: cargo } }, { upsert: true });
            interaction.reply({ content: `o cargo definido foi: ${cargo}`, ephemeral: true });
        }

    },
};