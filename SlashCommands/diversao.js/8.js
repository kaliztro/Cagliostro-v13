const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require(`../../config.json`);
const wait = require('util').promisify(setTimeout);


module.exports = {
    name: "8ball",
    description: "Te da resposta para suas perguntas!",
    options: [
        {
            name: 'pergunta',
            type: 'STRING',
            description: 'Faça a sua pergunta que te direi a minha opinião.',
            required: true
        },
    ],

    run: async (client, interaction, args) => {

        const option = interaction.options.getString('pergunta')

        var list = [
            'Sim.',
            'Não.',
            'Talvez.',
            'Não posso opinar sobre isso.',
            'Sei de nada o-0.',
            'Provavelmente sim.',
            'Provavelmente não.',
            'Não sei.',
            'Meus instintos dizem que sim e eles nunca erram.',
            'Hmm acho que não.',
            'Ah sei de nada não...fui!',
            'Isso é meio obvio.'
            ];
    
        var rand = list[Math.floor(Math.random()* list.length)];
       
        const embed = new MessageEmbed()
        .setColor(config.cor)
        .addFields(
            { name: 'Pergunta: ', value: `${option}`,},
            { name: `8ball: `, value: `${rand}`,},
        )
        .setTimestamp()
        .setThumbnail()
        .setFooter(`• Autor: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true, size: 1024})); 

        await interaction.deferReply();
        await wait(400);
        await interaction.editReply({embeds: [embed], ephemeral: false})
        
    },
};



