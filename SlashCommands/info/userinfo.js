const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

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


    run: async (client, interaction, args, config) => {
        const member = interaction.options.getMember("usuário") || interaction.member

        const activities = member.presence?.activities || []

        if (member.presence?.status === 'online') member.presence.status = '`🟢`Online'; 
        if (member.presence?.status === 'idle') member.presence.status = '`🟡`Ausente';
        if (member.presence?.status === 'dnd') member.presence.status = '`🔴`Não perturbar';

        let status = member.presence?.status || '`⚫`offline' 

        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setColor(config.cor)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addField(`Apelido`, `${member.nickname || `Esse usuario não possui apelido`}`)
            .addField("Tag", `#${member.user.discriminator}`)
            .addField("ID", member.id)
            .addField('Cargo(s)', `<@&${member._roles.join('> <@&')}>`)
            .addField(`Premium desde`, `${moment(member.premiumSinceTimestamp).format('LL') }`)
            .addField("Conta criada em:", ` ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`)
            .addField('Juntou-se ao servidor em:', `${moment(member.joinedAt).format('LL LTS')}`)
            .setDescription(activities.map((x, i) => `**${x.type}**: ${x.name || "None"} : ${x.details || "None"} : ${x.state || "None"}`).join("\n"))
            .addField("Status", status)

        interaction.reply({ embeds: [embed] });
    },
};