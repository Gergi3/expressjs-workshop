const mongoose = require('mongoose');
const { Schema } = mongoose;

const cubeSchema = new Schema({
    name: String,
    description: String,
    difficultyLevel: Number,
    imageUrl: String,
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;