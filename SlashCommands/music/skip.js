const player = require("../../config/player");

module.exports = {
    name: "skip",
    description: "pula a musica",
    run: async (client, interaction, args) => {
        const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.reply({
                content: "Nenhuma música está sendo reproduzida no momento",
            });

        await queue.skip();

        interaction.reply({ content: "Pulou a faixa atual!" });
    },
};
