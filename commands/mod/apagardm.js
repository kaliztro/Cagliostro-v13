const Discord = require("discord.js");
const config = require(`../../config/config.json`);

module.exports = {
    name: "apagardm",
    aliases: ["adm"],
    description: "Apaga mensagens enviadas na dm do bot.",

    run: async(client, message, args) => {

        message.react("✅");

  await message.author.createDM();
    await (await message.author.dmChannel.messages.fetch()).forEach( async (m)=> {
      if(m.author.bot){
        await m.delete();
      }
    });
    }
}