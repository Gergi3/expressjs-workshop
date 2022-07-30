const Cube = require('../models/Cube');

exports.create = (body) => new Cube(body);

exports.getById = (id) => Cube.findById(id);

exports.getByIdPopulatedAcessories = (id) => Cube.findById(id).populate('accessories');

exports.getAll = async (search, from, to) => {
    const query = {
        $and: [
            { name: { $regex: search || '', $options: 'i' } },
            { difficultyLevel: { $gte: Number(from) || 1 } },
            { difficultyLevel: { $lte: Number(to) || 6 } }
        ]
    };

    return Cube.find(query);
};

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);

exports.updateById = (cubeId, body) => Cube.findByIdAndUpdate(cubeId, body); 

exports.addAccessory = (cubeId, accessoryId) => {
    const query = {
        $push: {
            accessories: accessoryId
        }
    };

    return Cube.findByIdAndUpdate(cubeId, query);
}

exports.isAuthorized = async (cubeId, userId) => {
    const cube = await Cube.findById(cubeId);
    if (!cube.user || !userId || !cubeId) {
        return false;
    }
    return cube.user == userId;
}