const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require(`../../config.json`);
const moment = require('moment');

moment.locale('pt-BR');

module.exports = {
    name: "userinfo",
    description: "Mostra as informações do usuário.",
    options: [{
        name: 'usuário',
        type: 'USER',
        description: 'Usuário que vc gostaria de ver o avatar.',
        required: false
    }],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {
        const member = interaction.options.getMember("usuário") || interaction.member

        const activities = member.presence?.activities || []

        if (member.presence.status === 'online') member.presence.status = '`🟢`Online';
        if (member.presence.status === 'idle') member.presence.status = '`🟡`Ausente';
        if (member.presence.status === 'dnd') member.presence.status = '`🔴`Não perturbar';
        if (member.presence.status === 'offline') member.presence.status = '`⚫`offline';

        let status = member.presence.status;

        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setColor(config.cor)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addField("Tag", `#${member.user.discriminator}`)
            .addField("ID", member.id)
            .addField('Cargo(s)', `<@&${member._roles.join('> <@&')}>`)
            .addField("Conta criada em:", ` ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`)
            .addField('Juntou-se ao servidor em:', `${moment(member.joinedAt).format('LL LTS')}`)
            .setDescription(activities.map((x, i) => `**${x.type}**: ${x.name || "None"} : ${x.details || "None"} : ${x.state || "None"}`).join("\n"))
            .addField("Status", status)

        interaction.reply({ embeds: [embed] });
    },
};