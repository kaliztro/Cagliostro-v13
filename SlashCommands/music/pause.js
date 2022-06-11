const player = require("../../config/player");

module.exports = {
    name: "pause",
    description: "pausa a musica atual",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);

        queue.setPaused(true);

        return interaction.reply({ content: "Pausou a faixa atual!" });
    },
};
