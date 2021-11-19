const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "commands",
    aliases: [],
    description: "envia todos os comandos no chat.",

    run: async(client, message, args) => {

    client.commands.forEach (async c => {

    const command = client.commands.get(c.name)

    message.channel.send(`${command.name} \n ${command.description}`)

    })

    }
}