const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.login(client.config.token);

//prefix
client.on("messageCreate", async (message) => {

    const config = require("./config.json");
    const PREFIX = config.PREFIX

    const Schema = require("./models/Guilds")

    const guildConfig = await Schema.findOne({ _id: message.guild.id });
    const prefix = guildConfig?.Prefix.prefix ?? PREFIX

    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);

});

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); //importing node-fetch (updated)

fetch(`https://discloud.app/status/bot/882715660134797342`, { // https://discloud.app/status/user or https://discloud.app/status/bot/:id_bot
    headers: {
        "api-token": "VU4MAeKTpkSdbTFsBhg5tezKvo9T5Jx4MzTLNX8RaVkmDhFtJQOnK9CTqcTtX8W" //Use the .api command to get your token into the DM
    }
}).then(info => info.json()).then(json => console.log(json))