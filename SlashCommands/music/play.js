const { QueryType } = require("discord-player");
const { MessageEmbed } = require("discord.js");

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
    run: async (client, interaction, config) => {
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

            const tracks = queue.tracks.slice(0, 10).map((m, i) => {
                return `${i + 1}. [**${m.title}**](${m.url}) - ${
                    m.requestedBy.tag
                }`;
            });

        const pastel = new MessageEmbed()
        .setDescription(`🎶 Música adicionada à fila com sucesso!! 🎶`)
        .addField("Música(s):", `${tracks.join("\n")}${
            queue.tracks.length > tracks.length
                ? `\n...${
                      queue.tracks.length - tracks.length === 1
                          ? `${
                                queue.tracks.length - tracks.length
                            } more track`
                          : `${
                                queue.tracks.length - tracks.length
                            } more tracks`
                  }`
                : ""
        } ㅤ`)
        .setColor(config.cor)

        if (!queue?.playing) await interaction.editReply({ embeds: [tocando] });
        if (queue?.playing) await interaction.editReply({embeds: [pastel] });

        //fim

    },
};
