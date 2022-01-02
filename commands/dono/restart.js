const discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "reiniciar",
    description: "Reinicia o bot.",
    category: "dono",
    aliases: ["restart", "r"],
    run: async (client, message, args) => {
        
        if(message.author.id != config.donoID) {
            return message.channel.send(`${message.author}, Tu deve estar doidão né?, só o dono do Bot pode executar esse comando. \n se quiser que eu saia pede para o Kaliztro#4988`)
          }

        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); //importando o node-fetch (atualizado) / importing node-fetch (updated)

        fetch(`https://discloud.app/status/bot/882715660134797342/restart`, { 
            method: 'POST', 
            headers: {
                "api-token": "VU4MAeKTpkSdbTFsBhg5tezKvo9T5Jx4MzTLNX8RaVkmDhFtJQOnK9CTqcTtX8W" 
            }
        }).then(info => info.json()).then(json => console.log(json));
        
        

    }
}

