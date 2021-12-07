const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "coinflip",
    category: "outros",
    aliases: ["cf"],
    description: "Jogo de Cara ou Coroa.",
    usage: `coinflip **cara** ou **coroa**`,
    run: async (client, message, args) => {
  
    var array1 = ["cara", "coroa"];
  
    var rand = Math.floor(Math.random() * array1.length);
  
    if (!args[0] || (args[0].toLowerCase() !== "cara" && args[0].toLowerCase() !== "coroa")) {
      message.reply("insira **cara** ou **coroa** na frente do comando.");
    } 
  else if (args[0].toLowerCase() == array1[rand]) {
      message.channel.send("Deu **" + array1[rand] + "**, você ganhou!");
    } 
  else if (args[0].toLowerCase() != array1[rand]) {
      message.channel.send("Deu **" + array1[rand] + "**, você perdeu!"
      );
    }
    }
  };