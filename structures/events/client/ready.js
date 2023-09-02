const { ActivityType } = require("discord.js");
const client = require("../../Client");

client.on("ready", async () => {
    console.log(`\n🟩 ${client.user.tag} is online!`);

    client.riffy.init(client.user.id);

    client.user.setPresence({
        activities: [
            {
                name: "You",
                type: ActivityType.Watching
            }
        ],
        status: "online"
    })
})