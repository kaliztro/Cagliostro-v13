const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "apagar",
  aliases: ["a"],
  description: "Apaga as mensagens de um canal.",

  run: async (client, message, args) => {

    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply({ content: 'É. \n parece que vc não pode usar esse comando. 😂', ephemeral: true })

    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 1 || deleteCount > 99)
      return message.channel.send("forneça um número de até **99 mensagens** a serem excluídas");

    const fetched = await message.channel.messages.fetch({
      limit: deleteCount + 1
    });

    message.channel.bulkDelete(fetched);
    
    message.channel.send({ content: `**${args[0]} mensagens limpas nesse chat!**` });
  }
}

