const player = require("../../config/player");

module.exports = {
    name: "stop",
    description: "para a musica",
    run: async (client, interaction) => {

        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: "Por favor, junte-se a um canal de voz primeiro!",
            });

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        interaction.reply(`A música foi parada com sucesso`);

        if (queue.playing) await queue.stop();
    },
};
