const client = require("../index");
const Schema = require('../models/Outro');

client.on("ready", () => {

    setInterval(async () => {

        const stats = await Schema.findOne({ _id: `outros` });
        const msg = stats?.Status.mensagem

        client.user.setPresence({ activities: [{ name: msg, type: 'LISTENING' }], status: 'online' }) //idle

    }, 15 * 1000)

    console.log(`Bot ${client.user.username} logado com sucesso em ${client.guilds.cache.size} servidores.`);


    
    // config de inicialização

    let server = client.guilds.cache.get(`545386837846523905`);
    let canal = server.channels.cache.get('847321925189238796'); 

    // const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); //importing node-fetch (updated)

    // fetch(`https://discloud.app/status/bot/882715660134797342`, { // https://discloud.app/status/user or https://discloud.app/status/bot/:id_bot
    //     headers: {
    //         "api-token": client.config.Discloud
    //     }
    // }).then(info => info.json()).then(json => console.log(json))

    canal.send({content: `estou On `});

});



