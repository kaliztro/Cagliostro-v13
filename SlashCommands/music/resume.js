const player = require("../../config/player");
const { MessageEmbed } = require("discord.js");

const config = require("../../config.json");

module.exports = {
    name: "resume",
    description: "retomar a musica atual",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);

        queue.setPaused(false);

        const embed = new MessageEmbed()
        .setTitle(`▶️ ${interaction.user.username} Retomou a Música! `)
        .setColor(config.cor)

        return interaction.reply({ embeds: [embed] });
    },
};
