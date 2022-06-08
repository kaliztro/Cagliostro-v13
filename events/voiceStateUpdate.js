const Discord = require("discord.js");
const client = require("../index");
const id = require("../config/usuarios.json");

const voiceDiscord = require('@discordjs/voice');

const { join } = require('node:path');

client.on(`voiceStateUpdate`, async (oldstate, newstate, message) => {

    if (newstate) {

        if (newstate.id === id.fafsbricio) {

            const canal = newstate.channelId
            const server = newstate.guild.id

            if (canal === null) return;

            // console.log(canal) //id do canal que o usuario se conectou
            // console.log(newstate.id)  //id do usuario que fez a acao
            // console.log(newstate.guild.id) //id do servidor

            //som

            const player = voiceDiscord.createAudioPlayer({
                behaviors: {
                    noSubscriber: voiceDiscord.NoSubscriberBehavior.Pause,
                },
            });

            const connection = voiceDiscord.joinVoiceChannel({
                channelId: canal,
                guildId: server,
                adapterCreator: newstate.guild.voiceAdapterCreator,
            });
    
            connection.subscribe(player);
    
            let resource = voiceDiscord.createAudioResource(join(__dirname, '../sound/cabra.mp3'));
    
            player.play(resource);

            setTimeout(() =>  connection.destroy(), 4_000);

           
      
            
        }

    }



})