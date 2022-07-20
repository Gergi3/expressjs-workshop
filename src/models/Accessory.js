const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?:\/\//
    },
    description: {
        type: String,
        required: true,
        max: 120
    },
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;
