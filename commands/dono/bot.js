const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "bot",
    description: "Mostra o status do bot.",
    category: "dono",
    run: async (client, message, args) => {

        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); //importing node-fetch (updated)

        fetch(`https://discloud.app/status/bot/882715660134797342`, { // https://discloud.app/status/user or https://discloud.app/status/bot/:id_bot  
            headers: {
                "api-token": config.Discloud
            }
        }).then(info => info.json()).then(json => {

            let embed = new Discord.MessageEmbed()
                .setColor(config.cor)
                .addFields(
                    { name: `Status do bot`, value: `${json.bot_id}` },
                    { name: `info:`, value: `${json.info}` },
                    { name: `container:`, value: `${json.container}` },
                    {name: `cpu:`, value: `${json.cpu}`},
                    {name: `memory`, value: `${json.memory}`},
                    {name: `Reiniciado pela ultima vez há:`, value: `${json.last_restart}`},

                )

            message.channel.send({ embeds: [embed] });



        })




    }
}

// message.reply(`aqui estao os logs ${info.logs}`