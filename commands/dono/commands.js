const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "commands",
    aliases: [],
    description: "envia todos os comandos no chat.",

    run: async (client, message, args) => {

        if (message.author.id != config.donoID) {
            return message.channel.send(`${message.author}, Tu deve estar doidão né?, só o dono do Bot pode executar esse comando.`)
        }


        client.commands.forEach(async c => {

            const command = client.commands.get(c.name)

            message.channel.send(`${command.name} \n ${command.description}`)

        })

    }
}