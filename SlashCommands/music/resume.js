const player = require("../../config/player");

module.exports = {
    name: "resume",
    description: "retomar a musica atual",
    run: async (client, interaction) => {
        const queue = player.getQueue(interaction.guildId);

        queue.setPaused(false);

        return interaction.reply({ content: "Retomada a faixa atual!" });
    },
};
