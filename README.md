<img src="https://ik.imagekit.io/unburn/discord-pro-handler.svg" />

<p align="center">Most advanced handler for discord bot with shard and database support built using discord.js</p>

<p>

<p align="center">
    <a href="https://github.com/flameface/discord-pro-handler/"><b>Github</b></a> •
    <a href="https://discord.gg/66uGX7t4ww"><b>Support</b></a>
</p>

<div align="center">

![NPM Version](https://img.shields.io/npm/v/discord.js?label=discord.js&style=flat-square&color=%23FEB700)
![GitHub Repo stars](https://img.shields.io/github/stars/flameface/discord-pro-handler?style=flat-square&color=%23FEB700)
![GitHub forks](https://img.shields.io/github/forks/flameface/discord-pro-handler?style=flat-square&color=%23FEB700)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/flameface/discord-pro-handler?style=flat-square&color=%23FEB700)

</div>

# Discord Pro Handler
Experience the ultimate handler, equipped with basic to advanced features, stunning logging capabilities, a simple yet robust structure, shard support, and much more. Save valuable time by utilizing this comprehensive solution, designed to streamline the process of building bots effortlessly.

## Changelog
**UPDATE 2.0.0**
- New logging interface
- Added basic example commands

## Features
- Shard support with shard commands.
- Reload commands, slash commands & events without restarting the bot.
- Prefix + slash command support.
- Permission and error handlers.

## Installation
**1. Clone the repository**
```
git clone https://github.com/flameface/discord-pro-handler.git
```

**2. Install the required dependencies**
```
npm install
```

**3. Config the bot**
In [config](./structures/configuration/index.js) file, fill in the required fields.

**4. Run the bot**
```js
npm start

//OR

node index.js

//OR

node .
```

## Configs

#### Shard
If you want to use shards, then make sharding value true in [config](./structures/configuration/index.js) file.
```js
sharding: true
```

**Note**: Your bot should be in more than 2500 servers to use shards.

#### Database
If you want to use database, then make database value true in [config](./structures/configuration/index.js) file.
```js
database: true
```

## Command Config

#### Permissions
You can set the permissions for the command by adding **clientPermissions** and **userPermissions** in the command file.
```js
module.exports = {
    name: "ping",
    description: "Get the bot's ping",
    clientPermissions: ["SendMessages"],
    userPermissions: ["SendMessages"],
    run: async (client, message, args) => {
        message.channel.send(`${client.ws.ping}ms`);
    }
}
```

#### Developer Only
You can make the command developer only by adding **developerOnly** in the command file.
```js
module.exports = {
    name: "ping",
    description: "Get the bot's ping",
    developerOnly: true,
    run: async (client, message, args) => {
        message.channel.send(`Pong! ${client.ws.ping}ms`);
    }
}
```

#### Guild Only
You can make the command guild only by adding **guildOnly** in the command file.
```js
module.exports = {
    name: "ping",
    description: "Get the bot's ping",
    guildOnly: true,
    run: async (client, message, args) => {
        message.channel.send(`Pong! ${client.ws.ping}ms`);
    }
}
```

## Additional
We added a feature that will reload commands, slash commands, and events without restarting your bot, for example:

![alt text](./assets/example1.png)

## Support
That's all flamies, if you have any issue or problem, feel free to ask in our [community](https://discord.gg/bk6mz3hwXg).