const Discord = require("discord.js");
const config = require(`../../config/config.json`);

module.exports = {
    name: "tempo",
    aliases: ["temp"],
    description: "Mostra o tempo que o bot esta ON.",

    run: async(client, message, args) => {

        let dias = 0;
        let semanas = 0;
        
        let uptime = ``;
        let totalSegundos = (client.uptime / 1000);
        let horas = Math.floor(totalSegundos / 3600);
        totalSegundos %= 3600;
        let minutos = Math.floor(totalSegundos / 60);
        let segundos = Math.floor(totalSegundos % 60);
        
        if(horas > 23){
          dias = dias + 1;
          horas = 0;
        }
        
        if(dias == 7){
        dias = 0;
        semanas = semanas + 1;
        }
        
        if(semanas > 0){
          uptime += `${semanas} semanas, `;
        }
        
        if(minutos > 60){
          minutos = 0;
        }
        
        uptime += `🗓️ ${dias} Dias\n 🕝 ${horas} Horas\n 🕝 ${minutos} Minutos\n 🕝 ${segundos} Segundos`;
        
        const embed = new Discord.MessageEmbed()
          .setTitle(`Tempo de atividade 🕰️`)
          .setThumbnail("https://imgur.com/WZMylbw.gif")
          .setColor("#ff0202")
          .setDescription(`**Estou online há:**\n${uptime}`)
      
        message.reply({ embeds: [embed]});
    }
}