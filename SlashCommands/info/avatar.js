const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
            description: "Mostra o seu avatar ou do usuario selecionado.",
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário que vc gostaria de ver o avatar.',
                    required: false
                }
            ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args, config) => {

        const user = interaction.options.getUser('usuário') || interaction.user
        let avatar = user.displayAvatarURL({ dynamic: true, size: 1024})

        const embed = new MessageEmbed()
        .setColor(config.cor) 
        .setTitle(`Avatar de ${user.username}`) 
        .setImage(avatar) 
        .setFooter(`• Autor: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true, size: 1024})); 

        interaction.reply({ embeds: [embed]})
    },
};
