const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "cargo",
    aliases: [],
    description: "Atribui um cargo ao membro mencionado.",
    usage: `cargo @membro @cargo`,

    run: async(client, message, args) => {

        message.delete()

        var membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!membro) return message.channel.send({ content: `**${message.author.username}** Você não mencionou ninguém.` });

        var cargo = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if(!cargo) return message.channel.send({ content: `**${message.author.username}** Você não mencionou nenhum cargo. \n não sou adivinho. 😡`});

        if(!message.member.permissions.has("MANAGE_ROLES")) return message.reply('Parece que vc não tem permissão para isso, porfavor peça ajuda de um adulto.');

        membro.roles.add(cargo)

        message.channel.send({ content: `**${message.author.username}** atribuiu o cargo ${cargo} ao ${membro}.`})
    }
}