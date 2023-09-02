const mongoose = require('mongoose');
const config = require('../configuration/index')

async function connect() {
    mongoose.set('strictQuery', true)

    mongoose.connect(config.mongodbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.once("open", () => {
        console.log("🟩 Connected to mongoose");
    });

    mongoose.connection.on("error", (error) => {
        console.log(`🟥 MongoDB connection error: ${error}`);
    })

    return;
}

module.exports = { connect };