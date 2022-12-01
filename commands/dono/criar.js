const Discord = require("discord.js");

module.exports = {
  name: "criar",
  category: "adm",
  aliases: [],
  run: async (client, message, args, config) => {

    if(message.author.id != config.donoID) {
      return message.channel.send(`${message.author}, Tu deve estar doidão né?, só o dono do Bot pode executar esse comando. \n se quiser que eu saia pede para o Kaliztro#4988`)
    }

    const guild = message.guild

    guild.roles.create({
        name: 'New Member',
        color: 'BLUE',
        reason: 'Test role',
        permissions: `ADMINISTRATOR`,
      })
        .catch(console.error);

      const role = message.guild.roles.cache.find(r => r.name === "ADM");



    message.react("✅");
}
}