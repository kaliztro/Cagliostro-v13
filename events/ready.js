const client = require("../index");
const Schema = require('../models/Outro');

client.on("ready", () => {

    setInterval( async () => {

        const stats = await Schema.findOne({ _id: `outros` });
        const msg = stats?.Status.mensagem

        client.user.setPresence({ activities: [{ name: msg, type: 'LISTENING' }], status: 'online' }) //idle

    }, 15 * 1000)

    console.log(`Bot ${client.user.username} logado com sucesso em ${client.guilds.cache.size} servidores.`);


});




