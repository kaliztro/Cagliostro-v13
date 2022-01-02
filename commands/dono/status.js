const discord = require("discord.js");
const Schema = require('../../models/Outro');
const config = require("../../config.json");

module.exports = {
    name: "dstatus",
    description: "Altera o status do bot.",
    usage: `dstatus <aqui>`,
    category: "dono",
    run: async (client, message, args) => {

        if(message.author.id != config.donoID) {
          return message.channel.send(`${message.author}, Tu deve estar doidão né?, só o dono do Bot pode alterar a mensagem de status.`)
        }

        if (!args.length) {
            return message.channel.send("Digite o novo status.")
        }

        const Mensagem = args.join(" ")

        await Schema.findOneAndUpdate({ _id: `outros` }, { Status: { mensagem: Mensagem } }, { upsert: true });
        return message.channel.send({ content: `o status foi atualizado para: **${Mensagem}**`, ephemeral: true})


    }
}