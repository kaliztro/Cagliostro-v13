const { Client, CommandInteraction, MessageEmbed, Permissions} = require("discord.js");

module.exports = {
    name: 'cargo',
    description: 'Atribui um cargo ao membro selecionado.',
    options: [
        {
            name: 'usuário',
            type: 'USER',
            description: 'Usuário para o cargo.',
            required: true
        },
        {
            name: 'cargo',
            type: 'ROLE',
            description: 'Qual cargo?.',
            required: true
        }
    ],


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return interaction.reply({ content: 'Parece que vc não tem permissão para isso, porfavor peça ajuda de um adulto.', ephemeral: true })

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return interaction.reply({ content: '🛑 Erro ao atribuir o cargo ao usuário!, eu não tenho permissão de gerenciar cargos. ', ephemeral: true })

        const role = interaction.options.getRole('cargo');
        const member = interaction.options.getMember('usuário');
        const user = interaction.user

        member.roles.add(role)

         // .then(() => interaction.reply({ content: `Cargo atribuido com sucesso. 👌`, ephemeral: true }))
            .then(() => interaction.reply({ content: `**${user.username}** Atribuiu o cargo ${role} ao ${member}`, ephemeral: false }))
            .catch(() => interaction.reply({ content: '🛑 Erro ao atribuir o cargo ao usuário!', ephemeral: true }))
    
    },
};