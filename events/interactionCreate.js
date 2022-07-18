const { ButtonInteraction } = require("discord.js");
const config = require("../config/config.json");
const client = require("../index");

const Schema = require('../models/Guilds');


client.on("interactionCreate", async (interaction) => {

    // Slash Command Handling
    if (interaction.isCommand()) {
        //  await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args, config);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        // await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    //button
    if (interaction.isButton()) {

        const guildDB = await Schema.findOne({ _id: interaction.member.guild.id });

        let cargo = interaction.member.guild.roles.cache.get(guildDB?.Botao?.cargo) 

        if (!cargo) return

        let membro = interaction.member

        if (interaction.customId === `cargofreegame`){
            
            membro.roles.add(cargo)
            interaction.reply({ content: `Feitoria`, ephemeral: true})
        }

        if (interaction.customId === `removercargofreegame`){
            
            membro.roles.remove(cargo)
            interaction.reply({ content: `removido`, ephemeral: true})
        }

    }
    
});
