const client = require("../../client");
     client.riffy.on("queueEnd", async (player) => {
         const channel = client.channels.cache.get(player.textChannel);
     
         // Deletes the current player message if it exists
         if (player.message) {
             await player.message.delete().catch(() => {});
         }
    
        if (player.isAutoplay) {
            // Uses Riffy's built-in autoplay implementation
            player.autoplay(player);
        } else {
            // Standard cleanup when queue ends
            player.destroy();
            if (channel) {
                channel.send("Queue has ended.");
            }
        }
    });
