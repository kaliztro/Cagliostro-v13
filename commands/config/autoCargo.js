const Schema = require('../../models/Guilds');

module.exports = {
    name: "autocargo",
    aliases: [`ac`],
    description: "Configuração do sistema de cargo automatico.",

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR"))
        return message.reply("🛑 Parece que vc está tentando usar um comando que é permitido somente aos ADMs 🛑");

        const cargo = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]); 
        if(!cargo) return message.channel.send({ content: `**${message.author.username}** Você não mencionou nenhum cargo. \n não sou adivinho. 😡`});

        
        await Schema.findOneAndUpdate ({ _id: message.guild.id }, { AutoCargo: {cargo: cargo} }, { upsert: true });
        return message.channel.send(`o cargo definido foi: ${cargo}`)
        
    }
}

