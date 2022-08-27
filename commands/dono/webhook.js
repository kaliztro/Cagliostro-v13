const { WebhookClient, MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);

module.exports = {
    name: "web",
    category: "adm",
    aliases: [],
    description: "Webhook.",
    run: async (client, message, args,) => {

        if(message.author.id != config.donoID) {
            return message.channel.send(`${message.author}, Tu deve estar doidão né?, só o dono do Bot pode alterar a mensagem de status.`)
          }

        const webhookId = `928897200111636511`

        const webhookToken = `H942YCanqxtkbZcudS91Mi2bUt8AhMFYdeuuA3_-WQxYDRCrW1fXH9wrfnKOl5phaS8l`

        const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });

        const embed = new MessageEmbed()
            .setColor(config.cor)
            .setTitle(``)
            .setDescription(``)

        webhookClient.send({
            // content: ``,  //mensagem fora da embed
            username: 'Cagliostro', //se deixar vazio vai ser o nome do webhook padrao do server
            avatarURL: `https://i.imgur.com/QRfj1Wx.png`, //mesma coisa que o de cima so que com o avatar
            embeds: [embed]
        })

        // bot cria a webhook

        /*
        let channel = message.mentions.channels.first() || message.channel

        channel.createWebhook('Cagliostro', {
            avatar: 'https://i.imgur.com/QRfj1Wx.png',
        })
*/

    }
}

