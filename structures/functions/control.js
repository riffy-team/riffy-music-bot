const client = require("../Client");

async function reloadCommands(name) {
    const command = client.commands.get(name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

    if (!command) return new Error(`Command \`${name}\` doesn't exist, nor is it an alias.`)

    delete require.cache[require.resolve(`../commands/${command.category}/${command.name}.js`)];
    client.commands.delete(command.name);

    const newCommand = require(`../commands/${command.category}/${command.name}.js`);

    try {
        if (!newCommand.name || !newCommand.description) {
            return `Couldn't reload the command ${command.name}, error: Missing a name, description or run function.`
        }

        newCommand.category = command.category;
        client.commands.set(newCommand.name, newCommand);

        return `Reloaded command : ${newCommand.name}`
    } catch (err) {
        return `Couldn't reload the command ${command.name}, error: ${err}`
    }
}

async function reloadSlash(name) {
    const command = client.slashCommands.get(name);

    if (!command) return new Error(`Command \`${name}\` doesn't exist, nor is it an alias.`)

    delete require.cache[require.resolve(`../slashcommands/${command.category}/${command.name}.js`)];
    client.slashCommands.delete(command.name);

    const newCommand = require(`../slashcommands/${command.category}/${command.name}.js`);

    try {
        if (!newCommand.name || !newCommand.description) {
            return `Couldn't reload the command ${command.name}, error: Missing a name, description or run function.`
        }

        newCommand.category = command.category;
        client.slashCommands.set(newCommand.name, newCommand);

        return `Reloaded slash command : ${newCommand.name}`
    } catch (err) {
        return `Couldn't reload the slash command ${command.name}, error: ${err}`
    }
}

module.exports = {
    reloadCommands,
    reloadSlash
}