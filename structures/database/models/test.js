const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    clientId: String,
    guildId: String,
})

module.exports = mongoose.model('test', Schema);