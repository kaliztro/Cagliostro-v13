const Discord = require("discord.js");
const config = require("../../config.json");
const Schema = require('../../models/Guilds');

module.exports = {
    name: "saida",
    aliases: [`s`],
    description: "Configuração do sistema de saida.",

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR"))
        return message.reply("🛑 Parece que vc está tentando usar um comando que é permitido somente aos ADMs 🛑");
    
        let opa = message.mentions.channels.first() 
    
        if(!opa) { 
          return message.channel.send("Primeiro você deve mencionar um canal")
        }

        
        await Schema.findOneAndUpdate({ _id: message.guild.id }, { Saida: {canal: opa} }, { upsert: true });
        return message.channel.send(`o canal foi definido em: ${opa}`)
        
    }
}

