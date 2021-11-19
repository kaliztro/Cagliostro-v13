const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const config = require(`../../config.json`);

module.exports = {
    name: "serverinfo",
    description: "Informação sobre o servidor.",


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {
        const verificationLevels = {
            NONE: 'Nenhuma',
            LOW: 'Baixa',
            MEDIUM: 'Media',
            HIGH: 'Alta',
            VERY_HIGH: 'Muito alta'
          };
          const regions = {
              brazil: 'Brazil',
              europe: 'Europe',
              hongkong: 'Hong Kong',
              india: 'India',
              japan: 'Japan',
              russia: 'Russia',
              singapore: 'Singapore',
              southafrica: 'South Africa',
              sydney: 'Sydney',
              'us-central': 'US Central',
              'us-east': 'US East',
              'us-west': 'US West',
              'us-south': 'US South'
          }
          
    
            const date = interaction.guild.createdAt
            const joined = interaction.member.joinedAt
            const members = interaction.guild.members.cache;
            const owner = await interaction.guild.fetchOwner();
            const guild = interaction.guild
            
            const embed = new MessageEmbed()
            .setColor(config.cor)
            .setThumbnail(interaction.guild.iconURL())
            .setAuthor('🔍 Informações do servidor')
            .addField('**Nome**', interaction.guild.name, true)
            .addField('**ID**', interaction.guild.id, true)
            .addField('**Dono(a)**', `${owner}`)
            //.addField(`**Região:** ${guild.region}`)
            //.addField('**Canais**', interaction.guild.channels.cache.size, true)
            //.addField('**Cargos**', interaction.guild.roles.cache.size, true)
            .addField('**Humanos | Bots**', `${interaction.guild.members.cache.filter(member => !member.user.bot).size} | ${interaction.guild.members.cache.filter(member => member.user.bot).size}`)
            .addField('**Nivel de Boost**', interaction.guild.premiumTier , 'Nivel', interaction.guild.premiumTier)
            .addField(`**Nivel de verificação**`, `${verificationLevels[interaction.guild.verificationLevel]}`)
            .addField('**Criado em**', formatDate('DD/MM/YYYY', date))
            .setTimestamp()

          interaction.reply({ embeds: [embed]})
    },
};


    /**
     * Formata a data passada para o padrão do Brasil.
     * @param {string} template
     * @param {Date=} [date]
     * @return {string}
     */
     function formatDate (template, date) {
        var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
        date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
        return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
          return template.split(specs[i]).join(item)
        }, template)
      }