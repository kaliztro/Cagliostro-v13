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
      MEDIUM: 'Média',
      HIGH: 'Alta',
      VERY_HIGH: 'Muito alta'
    };

    const premiumTier =  {
      NONE: `Esse servidor não possui boost. 😥`,
      TIER_1: `Nível 1`,
      TIER_2: `Nível 2`,
      TIER_3: `Nível 3`,
    }

    const date = interaction.guild.createdAt
    const owner = await interaction.guild.fetchOwner();

    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setThumbnail(interaction.guild.iconURL())
      .setAuthor('🔍 Informações do servidor')
      .addField('**Nome**', interaction.guild.name, true)
      .addField('**ID**', interaction.guild.id, true)
      .addField(`**Descrição**`, `${interaction.guild.description || `Servidor não possui descrição`}`)
      .addField('**Dono(a)**', `${owner}`)
      .addField(`**Região:**`, interaction.guild.preferredLocale) 
      .addField(`**Canais**`, `${interaction.guild.channels.cache.size}`)
      .addField('**Cargos**', `${interaction.guild.roles.cache.size}`)
      .addField('**Humanos | Bots**', `${interaction.guild.members.cache.filter(member => !member.user.bot).size} | ${interaction.guild.members.cache.filter(member => member.user.bot).size}`)
      .addField(`**Canal de Regras**`, `<#${interaction.guild.rulesChannelId}>` )
      .addField('Nível de boost', premiumTier[interaction.guild.premiumTier])
      .addField(`**Nível de verificação**`, `${verificationLevels[interaction.guild.verificationLevel]}`)
      .addField('**Criado em**', formatDate('DD/MM/YYYY', date))
      .setTimestamp()

    interaction.reply({ embeds: [embed] })
  },
};   

/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate(template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}