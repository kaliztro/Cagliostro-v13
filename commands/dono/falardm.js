const Discord = require('discord.js')
const config = require(`../../config/config.json`);

module.exports = {
  name: "falardm",
  category: "dono",
  aliases: ["fdm"],
  description: "Bot fala o que for escrito para o usuario mencinado no privado.",
  usage: `falardm @usuario conteudo da mensagem`,
  run: async (client, message, args) => {

    if(message.author.id != config.donoID) {
      return message.channel.send(`${message.author}, Tu deve estar doidão né?, só o dono do Bot pode executar esse comando.`)
    }

      let guild = message.guild
  
      let parms = args.slice(' '); 
      parms.shift();
      msg = parms.join(' ')

  
      let usuario = client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase() == args.join(" ").toLowerCase()) || message.mentions.users.first()    
      if(!usuario) { return message.reply ("Você precisa dizer uma pessoa!");
      }
  
      if(!msg) {
         return message.reply("Você precisa de uma mensagem!");
      }
  
      message.delete()
      await usuario.send({content: `${msg}`}).catch(err => console.log(err))
  
  }
}