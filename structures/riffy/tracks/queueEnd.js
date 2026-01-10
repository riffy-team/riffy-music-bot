const client = require("../../client")

client.riffy.on("queueEnd", async (player) => {
    const channel = client.channels.cache.get(player.textChannel);
    
    if (player.message) await player.message.delete();

    if (player.isAutoplay) {
        try {
            const previous = player.previous;
            if (!previous) {
                player.destroy();
                return channel.send("Queue has ended.");
            }

            const previousId = previous.info.identifier || previous.info.uri;
            
            // Initialize custom played set in data if not exists
            if (!player.data.autoplayPlayed) player.data.autoplayPlayed = new Set();
            player.data.autoplayPlayed.add(previousId);

            let query;
            let source = "ytmsearch";

            // Basic Strategy: YouTube Mix
            if (previous.info.sourceName === "youtube" || previous.info.sourceName === "ytmsearch") {
                 query = `https://www.youtube.com/watch?v=${previous.info.identifier}&list=RD${previous.info.identifier}`;
            } else {
                 query = `${previous.info.author} - ${previous.info.title}`;
            }

                         const resolve = await client.riffy.resolve({ 
                            query: query, 
                            source: source,
                            requester: previous.info.requester 
                        });
            
                         let choices = [];
                         
                         if (resolve && resolve.tracks && resolve.tracks.length > 0) {
                             // 1. Try to find tracks not played yet
                             choices = resolve.tracks.filter(t => {
                                 const id = t.info.identifier || t.info.uri;
                                 return !player.data.autoplayPlayed.has(id);
                             });
            
                             // 2. If all played or none found, allow repeats but NOT the immediate previous one
                             if (choices.length === 0) {
                                 choices = resolve.tracks.filter(t => { 
                                     const id = t.info.identifier || t.info.uri;
                                     return id !== previousId;
                                 });
                             }
                         }
            
                         // 3. Fallback: If YouTube Mix failed or returned nothing useful, try a general search
                         if (choices.length === 0) {
                             const fallbackQuery = `${previous.info.author} - ${previous.info.title}`;
                             const fallbackResolve = await client.riffy.resolve({
                                 query: fallbackQuery,
                                 source: "ytmsearch",
                                 requester: previous.info.requester
                             });
                             
                             if (fallbackResolve && fallbackResolve.tracks && fallbackResolve.tracks.length > 0) {
                                 choices = fallbackResolve.tracks.filter(t => {
                                     const id = t.info.identifier || t.info.uri;
                                     return id !== previousId;
                                 });
                             }
                         }
                         
                         // 4. Final check: if still nothing, then we give up
                         if (choices.length === 0) {
                               player.destroy();
                               return channel.send("Queue has ended (No related tracks found).");
                         }
            
                         const nextTrack = choices[Math.floor(Math.random() * choices.length)];             
             // Setup for next
             nextTrack.info.requester = previous.info.requester;
             
             player.queue.add(nextTrack);
             player.play();

        } catch (e) {
            console.error("Autoplay Error:", e);
            player.destroy();
            channel.send("Queue has ended.");
        }
    } else {
        player.destroy();
        channel.send("Queue has ended.");
    }
})