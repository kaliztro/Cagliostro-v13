const { QueryType } = require("discord-player");
const player = require("../../config/player");

module.exports = {
    name: "play",
    description: "toca uma musica",
    options: [
        {
            name: "songtitle",
            description: "titulo da musica",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const songTitle = interaction.options.getString("songtitle");

        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: "Por favor, junte-se a um canal de voz primeiro!",
            });

        interaction.reply({ content: `Tocando ${songTitle}` });

        const searchResult = await player.search(songTitle, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        if (!queue.connection)
            await queue.connect(interaction.member.voice.channel);

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
