const client = require("../client");

// Common function to reload a command
const reload_command = async (collection, path, name) => {
    const command = collection.get(name);

    if (!command) return `Command \`${name}\` doesn't exist in ${collection === client.commands ? 'regular' : 'slash'} commands.`;

    try {
        delete require.cache[require.resolve(`../${path}/${command.category}/${command.name}.js`)];
        collection.delete(command.name);

        const newCommand = require(`../${path}/${command.category}/${command.name}.js`);

        if (!newCommand.name || !newCommand.description || typeof newCommand.run !== 'function') {
            throw new Error(`Couldn't reload the command ${command.name}, error: Missing a name, description, or run function.`);
        }

        newCommand.category = command.category;
        collection.set(newCommand.name, newCommand);

        return `Reloaded ${collection === client.commands ? 'regular' : 'slash'} command: ${newCommand.name}`;
    } catch (err) {
        return `Couldn't reload the ${collection === client.commands ? 'regular' : 'slash'} command ${command.name}, error: ${err}`;
    }
};

const reload_commands = async (name) => {
    return reload_command(client.commands, 'commands', name);
};

const reload_slash = async (name) => {
    return reload_command(client.slashCommands, 'slashcommands', name);
};

module.exports = { reload_commands, reload_slash };