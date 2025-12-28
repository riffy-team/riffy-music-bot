const { readdirSync } = require("fs");
const { REST, Routes, Client, Collection } = require('discord.js');
const { client_id, client_token, nodes } = require("./configuration/index");
const { logger } = require("./functions/logger");
const { Riffy } = require("riffy");
const { initializeFonts } = require("musicard");

initializeFonts();

const client = new Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "MessageContent",
        "GuildVoiceStates"
    ]
});

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();

client.riffy = new Riffy(client, nodes, {
    send: (payload) => {
        const guild = client.guilds.cache.get(payload.d.guild_id);
        if (guild) guild.shard.send(payload);
    },
    defaultSearchPlatform: "ytmsearch",
    restVersion: "v4"
});

module.exports = client;

(async () => {
    await load_commands()
    await load_events()
    await load_slash_commands()
    /**
     * You can add more handlers as per your need.
     */
    await load_riffy()
})()

client.login(client_token).catch((error) => {
    logger("Couldn't login to the bot. Please check the config file.", "error")
    console.log(error)
    return process.exit()
})

process.on('unhandledRejection', error => {
    logger("An unhandled rejection error occured.", "error")
    console.log(error)
})

process.on('uncaughtException', error => {
    logger("An uncaught exception error occured.", "error")
    console.log(error)
})


async function load_commands() {
    console.log("\n---------------------")

    logger("INITIATING COMMANDS", "debug")

    readdirSync('./structures/commands/').forEach(dir => {
        const commands = readdirSync(`./structures/commands/${dir}`).filter(file => file.endsWith('.js'));

        for (const file of commands) {
            const pull = require(`./commands/${dir}/${file}`);

            try {
                if (!pull.name || !pull.description) {
                    logger(`Missing a name, description or run function in ${file} command.`, "error")
                    continue;
                }

                pull.category = dir;
                client.commands.set(pull.name, pull);

                logger(`[COMMANDS] ${pull.name}`, "info")
            } catch (err) {
                logger(`Couldn't load the command ${file}, error: ${err}`, "error")
                continue;
            }


            if (pull.aliases && Array.isArray(pull.aliases)) {
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            }
        }
    })

    console.log("---------------------")
}

async function load_events() {
    console.log("\n---------------------")
    logger("INITIATING EVENTS", "debug")

    readdirSync('./structures/events/').forEach(async (dir) => {
        const events = readdirSync(`./structures/events/${dir}`).filter((file) => file.endsWith(".js"));

        for (const file of events) {
            const pull = require(`./events/${dir}/${file}`);

            try {
                if (pull.name && typeof pull.name !== 'string') {
                    logger(`Couldn't load the event ${file}, error: Property event should be string.`)
                    continue;
                }

                pull.name = pull.name || file.replace('.js', '');

                logger(`[EVENTS] ${pull.name}`, "info")
            } catch (err) {
                logger(`Couldn't load the event ${file}, error: ${err}`, "error")
                continue;
            }
        }
    });

    console.log("---------------------")
}

async function load_slash_commands() {
    console.log("\n---------------------")
    logger("INITIATING SLASH COMMANDS", "debug")

    const slash = [];

    readdirSync('./structures/slashcommands/').forEach(async (dir) => {
        const commands = readdirSync(`./structures/slashcommands/${dir}`).filter((file) => file.endsWith(".js"));

        for (const file of commands) {
            const pull = require(`./slashcommands/${dir}/${file}`);

            try {
                if (!pull.name || !pull.description) {
                    logger(`Missing a name, description or run function in ${file} slash command.`, "error")
                    continue;
                }

                const data = {};
                for (const key in pull) {
                    data[key.toLowerCase()] = pull[key];
                }

                slash.push(data);

                pull.category = dir;
                client.slashCommands.set(pull.name, pull);

                logger(`[SLASH] ${pull.name}`, "info")
            } catch (err) {
                logger(`Couldn't load the slash command ${file}, error: ${err}`, "error")
                console.log(err)
                continue;
            }
        }
    })

    console.log("---------------------")

    if (!client_id) {
        logger("Couldn't find the client ID in the config file.", "error")
        return process.exit()
    }

    const rest = new REST({ version: '10' }).setToken(client_token);

    try {
        await rest.put(Routes.applicationCommands(client_id), { body: slash }).then(() => {
            console.log("\n---------------------")
            logger("Successfully registered application commands.", "success")
            console.log("---------------------")
        })
    } catch (err) {
        logger("Couldn't register application commands.", "error")
        console.log(err);
    }
}

async function load_riffy() {
    console.log("\n---------------------")
    logger("INITIATING RIFFY", "debug")

    readdirSync('./structures/riffy/').forEach(async dir => {
        const lavalink = readdirSync(`./structures/riffy/${dir}`).filter(file => file.endsWith('.js'));

        for (let file of lavalink) {
            try {
                let pull = require(`./riffy/${dir}/${file}`);

                if (pull.name && typeof pull.name !== 'string') {
                    logger(`Couldn't load the riffy event ${file}, error: Property event should be string.`, "error")
                    continue;
                }

                pull.name = pull.name || file.replace('.js', '');

                logger(`[RIFFY] ${pull.name}`, "info")
            } catch (err) {
                logger(`Couldn't load the riffy event ${file}, error: ${err}`, "error")
                console.log(err)
                continue;
            }
        }
    })
}