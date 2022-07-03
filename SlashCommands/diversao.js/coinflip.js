const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    // name: "coinflip",
    // description: "Jogo de Cara ou Coroa.",
    // options: [
    //     {
    //         name: 'cara-ou-coroa',
    //         type: 'STRING',
    //         description: 'Escolha Cara ou Coroa.',
    //         required: true
    //     },
    // ],

    type: 'SUB_COMMAND',
    name: 'coinflip',
    description: 'Jogo de Cara ou Coroa.',
    options: [
        {
            name: "cara-ou-coroa",
            description: "Escolha Cara ou Coroa.",
            type: `STRING`,
            required: true,
            choices: [
                {
                    name: "Cara",
                    value: "cara"
                },
                {
                    name: "Coroa",
                    value: "coroa"
                },
            ]
        }
    ],

    run: async (client, interaction, args) => {

        var array1 = ["cara", "coroa"];
  
        var rand = Math.floor(Math.random() * array1.length);
      
        const escolha = interaction.options.getString('cara-ou-coroa')

      if (escolha.toLowerCase() == array1[rand]) {
          interaction.reply("Deu **" + array1[rand] + "**, você ganhou!")
        } 
      else if (escolha.toLowerCase() != array1[rand]) {
          interaction.reply("Deu **" + array1[rand] + "**, você perdeu!")
        }

    },
};



