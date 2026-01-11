module.exports = {
    client_token: "",
    client_id: "",
    client_prefix: "!",
    mongodb_url: "", //optional
    developers: ["1203605618745933880"],
    sharding: false,
    database: false,
    nodes: [
        {
            host: "localhost",
            port: 2333,
            password: "youshallnotpass",
            secure: false
        }
    ]
}

/**
 * Get discord bot token from here https://discord.com/developers/applications
 * Get mongodb url from https://www.mongodb.com/
 */

