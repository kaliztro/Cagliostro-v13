const { QueryType } = require("discord-player");
const { MessageEmbed } = require("discord.js");

const player = require("../../config/player");
const config = require("../../config.json");

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

        await interaction.deferReply();

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

        //inicio das msg "tocando agora" e "adicionado a fila"

        const currentTrack = queue.current;

        const tocando = new MessageEmbed()
            .setTitle(`Tocando:  ${currentTrack.title}`)
            .addField(`Compositor:`, currentTrack.author)
            .addField(`Adicionado por:`, currentTrack.requestedBy.tag)
            .addField(`Link:`, currentTrack.url)
            .setImage(currentTrack.thumbnail)
            .setColor(config.cor)

        const fila = new MessageEmbed()
        .setDescription(`A música **${queue.tracks}** foi adiconada à fila com sucesso!!`)
        .setColor(config.cor)

        if (!queue?.playing) await interaction.editReply({ embeds: [tocando] });
        if (queue?.playing) await interaction.editReply({embeds: [fila] });

        //fim

    },
};
