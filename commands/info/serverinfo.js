const Discord = require("discord.js");
const config = require(`../../config/config.json`);
const moment = require('moment')

moment.updateLocale('pt-br');

module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    description: "Informação sobre o servidor.",

    run: async(client, message, args) => {

        const verificationLevels = {
            NONE: 'Nenhuma',
            LOW: 'Baixa',
            MEDIUM: 'Media',
            HIGH: 'Alta',
            VERY_HIGH: 'Muito alta'
          };
      
          const premiumTier =  {
            NONE: `Nenhum`
          }
      
          const date = message.guild.createdAt
          const owner = await message.guild.fetchOwner();
      
          const embed = new Discord.MessageEmbed()
            .setColor(config.cor)
            .setThumbnail(message.guild.iconURL())
            .setAuthor('🔍 Informações do servidor')
            .addField('**Nome**', message.guild.name, true)
            .addField('**ID**', message.guild.id, true)
            .addField('**Dono(a)**', `${owner}`)
            .addField(`**Região:**`, `${message.guild.preferredLocale}`) // está retornando undefined
            .addField(`**Canais**`, `${message.guild.channels.cache.size}`)
            .addField('**Cargos**', `${message.guild.roles.cache.size}`)
            .addField('**Humanos | Bots**', `${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`)
            .addField('**Nivel de Boost**', premiumTier[message.guild.premiumTier], 'Nivel', message.guild.premiumTier)
            .addField(`**Nivel de verificação**`, `${verificationLevels[message.guild.verificationLevel]}`)
            .addField('**Criado em**', formatDate('DD/MM/YYYY', date))
            .setTimestamp()
      
          message.reply({ embeds: [embed]})
    
        }
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