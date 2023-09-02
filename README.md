# ___Pro Handler Template (Riffy Music Bot)___
I made this **handler** template keeping in mind that you know the basics of js and djs, so I won't be explaining the basics of js and djs in this readme.

## ___Features___
- Shard support with shard stats commands
- Easy to interact
- Reload commands, slash commands, events, and more without restarting the bot
- Developer commands
- Database support (using mongoose)
- Prefix + Slash commands support
- Error handling & Permission handling
- Customizable
- Music commands (using riffy)

## ___Requirements___
- Node.js v16 or higher
- Built using discord.js v14
- MongoDB database (optional)

## ___Installation___
#### ___1. Clone the repository___
```bash
git clone https://github.com/flam3face/advanced-handler.git
```

#### ___2. Install the dependencies___
```bash
npm install
```

#### ___3. Configure the bot___
In [config](./structures/configuration/index.js) file, fill in the required fields.

#### ___4. Run the bot___
```bash
npm start
```

## ___Shard___
If you want to use shards, then make shard true in [config](./structures/configuration/index.js) file.

```js
shard: true
```

**Note**: Your bot should be in more than 2500 servers to use shards. 

## ___Database (optional)___
If you want to use database, then make database true in [config](./structures/configuration/index.js) file.

```js
database: true
```

**Note**: You need to have a [MongoDB](https://www.mongodb.com/products/platform/cloud) database to use the database and you need to put mongodb url in [config](./structures/configuration/index.js) file.

## ___Lavalink___
If you want to use lavalink, then put your lavalink host in [config](./structures/configuration/index.js) file.

```js
nodes: [
        {
            host: "localhost",
            port: 2333,
            password: "youshallnotpass",
            secure: false
        }
    ]
```

## ___Command Config___
#### ___1. Permissions___
You can set the permissions for the command by adding **clientPermissions** and **userPermissions** in the command file.

```js
module.exports = {
    name: "ping",
    description: "Get the bot's ping",
    clientPermissions: ["SendMessages"], // Permissions that the bot needs to run the command
    userPermissions: ["SendMessages"], // Permissions that the user needs to run the command
    run: async (client, message, args) => {
        message.channel.send(`Pong! ${client.ws.ping}ms`);
    }
}
```

#### ___2. Developer Only___
You can make the command developer only by adding **developerOnly** in the command file.

```js
module.exports = {
    name: "ping",
    description: "Get the bot's ping",
    developerOnly: true, // If this is true, then only the bot developers can run this command
    run: async (client, message, args) => {
        message.channel.send(`Pong! ${client.ws.ping}ms`);
    }
}
```

#### ___3. Guild Only___
You can make the command guild only by adding **guildOnly** in the command file.

```js
module.exports = {
    name: "ping",
    description: "Get the bot's ping",
    guildOnly: true, // If this is true, then the command can only be used in guilds
    run: async (client, message, args) => {
        message.channel.send(`Pong! ${client.ws.ping}ms`);
    }
}
```

## ___Controls___

#### ___1. Reload___
You can reload commands & slash commands without restarting the bot.

```js
const { ApplicationCommandOptionType } = require("discord.js");
const { reloadCommands } = require("../../functions/control");

module.exports = {
    name: "reloadcommand",
    description: "Reloads a command",
    options: [
        {
            name: "command",
            description: "The command to reload",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        const command = interaction.options.getString("command");
        const output = await reloadCommands(command);

        interaction.reply(output);
    }
}
```

## ___Contact___
If you have any questions or suggestions, then you can join our [support server](https://discord.gg/TvjrWtEuyP) and ask there.

## ___License___
This project is licensed under the [MIT License](./LICENSE).