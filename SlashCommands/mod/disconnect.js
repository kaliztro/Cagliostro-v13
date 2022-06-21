const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const config = require(`../../config.json`);

module.exports = {
    name: "disconnect",
    description: "Desconecta o usuário do canal de voz.",
    options: [
        {
            name: 'usuário',
            type: 'USER',
            description: 'Usuário que vc gostaria de desconectar do canal de voz.',
            required: true
        },
        {
            name: 'motivo',
            type: 'STRING',
            description: 'Motivo da desconexão.',
            required: false
        },
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return interaction.reply({ content: 'Você não manda em mim. 😡', ephemeral: true })

        const cara = interaction.options.getUser('usuário');
        let reason = interaction.options.getString('motivo') || `Motivo não especificado.`

        let user = await interaction.guild.members.fetch(cara);
        let member = interaction.guild.members.cache.get(user.id)

        const embed = new MessageEmbed()
        .setAuthor(`${cara.tag} foi desconectado de um canal de voz 🤫`, member.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`** Desconectado por:** ${interaction.user.username} \n **Motivo:** ${reason} `)
        .setColor(config.cor)
        .setTimestamp()


        user.voice.disconnect() 
        .then(() => interaction.reply({embeds: [embed]}))
        .catch(() => interaction.reply({ content: '🛑 Eu não consigo fazer isso! talvez eu não tenha permissão para tal coisa. ', ephemeral: true }))


    },
};
