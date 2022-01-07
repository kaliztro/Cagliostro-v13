const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "logs",
    description: "Mostra os logs do bot.",
    category: "dono",
    run: async (client, message, args) => {

        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); //importing node-fetch (updated)

        fetch(`https://discloud.app/status/bot/882715660134797342/logs`, { // https://discloud.app/status/user or https://discloud.app/status/bot/:id_bot  
            headers: {
                "api-token": config.Discloud
            }
        }).then(info => info.json()).then(json => {

            let embed = new Discord.MessageEmbed()
                .setColor(config.cor)
                .addFields(
                    { name: `Logs do Bot`, value: `${json.bot_id}` },
                    { name: `Link para os logs completo:`, value: `${json.link}` },
                    { name: `Logs:`, value: `${json.logs}` }
                )

            message.channel.send({ embeds: [embed] });



        })




    }
}

// message.reply(`aqui estao os logs ${info.logs}`